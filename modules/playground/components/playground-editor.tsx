"use client";

import { useRef, useEffect, useCallback } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import {
    configureMonaco,
    defaultEditorOptions,
    getEditorLanguage,
} from "@/modules/playground/lib/editor-config";
import type { TemplateFile } from "@/modules/playground/lib/path-to-json";

interface PlaygroundEditorProps {
    activeFile: TemplateFile | undefined;
    content: string;
    onContentChange: (value: string) => void;
    suggestion: string | null;
    suggestionLoading: boolean;
    suggestionPosition: { line: number; column: number } | null;
    onAcceptSuggestion: (editor: any, monaco: any) => void;
    onRejectSuggestion: (editor: any) => void;
    onTriggerSuggestion: (type: string, editor: any) => void;
    isAIEnabled: boolean;
}

export const PlaygroundEditor = ({
    activeFile,
    content,
    onContentChange,
    suggestion,
    suggestionLoading,
    suggestionPosition,
    onAcceptSuggestion,
    onRejectSuggestion,
    onTriggerSuggestion,
    isAIEnabled,
}: PlaygroundEditorProps) => {
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const inlineCompletionProviderRef = useRef<any>(null);
    const currentSuggestionRef = useRef<{
        text: string;
        position: { line: number; column: number };
        id: string;
    } | null>(null);
    const isAcceptingSuggestionRef = useRef(false);
    const suggestionAcceptedRef = useRef(false);
    const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tabCommandRef = useRef<any>(null);

    // Generate unique ID for each suggestion
    const generateSuggestionId = () =>
        `suggestion-${Date.now()}-${Math.random()}`;

    // Create inline completion provider
    const createInlineCompletionProvider = useCallback(
        (monaco: Monaco) => {
            return {
                provideInlineCompletions: async (
                    model: any,
                    position: any,
                    context: any,
                    token: any,
                ) => {
                    console.log("provideInlineCompletions called", {
                        hasSuggestion: !!suggestion,
                        hasPosition: !!suggestionPosition,
                        currentPos: `${position.lineNumber}:${position.column}`,
                        suggestionPos: suggestionPosition
                            ? `${suggestionPosition.line}:${suggestionPosition.column}`
                            : null,
                        isAccepting: isAcceptingSuggestionRef.current,
                        suggestionAccepted: suggestionAcceptedRef.current,
                    });

                    // Don't provide completions if we're currently accepting or have already accepted
                    if (
                        isAcceptingSuggestionRef.current ||
                        suggestionAcceptedRef.current
                    ) {
                        console.log(
                            "Skipping completion - already accepting or accepted",
                        );
                        return { items: [] };
                    }

                    // Only provide suggestion if we have one
                    if (!suggestion || !suggestionPosition) {
                        console.log("No suggestion or position available");
                        return { items: [] };
                    }

                    // Check if current position matches suggestion position (with some tolerance)
                    const currentLine = position.lineNumber;
                    const currentColumn = position.column;

                    const isPositionMatch =
                        currentLine === suggestionPosition.line &&
                        currentColumn >= suggestionPosition.column &&
                        currentColumn <= suggestionPosition.column + 2; // Small tolerance

                    if (!isPositionMatch) {
                        console.log("Position mismatch", {
                            current: `${currentLine}:${currentColumn}`,
                            expected: `${suggestionPosition.line}:${suggestionPosition.column}`,
                        });
                        return { items: [] };
                    }

                    const suggestionId = generateSuggestionId();
                    currentSuggestionRef.current = {
                        text: suggestion,
                        position: suggestionPosition,
                        id: suggestionId,
                    };

                    console.log("Providing inline completion", {
                        suggestionId,
                        suggestion: suggestion.substring(0, 50) + "...",
                    });

                    // Clean the suggestion text (remove \r characters)
                    const cleanSuggestion = suggestion.replace(/\r/g, "");

                    return {
                        items: [
                            {
                                insertText: cleanSuggestion,
                                range: new monaco.Range(
                                    suggestionPosition.line,
                                    suggestionPosition.column,
                                    suggestionPosition.line,
                                    suggestionPosition.column,
                                ),
                                kind: monaco.languages.CompletionItemKind
                                    .Snippet,
                                label: "AI Suggestion",
                                detail: "AI-generated code suggestion",
                                documentation: "Press Tab to accept",
                                sortText: "0000", // High priority
                                filterText: "",
                                insertTextRules:
                                    monaco.languages
                                        .CompletionItemInsertTextRule
                                        .InsertAsSnippet,
                            },
                        ],
                    };
                },
                freeInlineCompletions: (completions: any) => {
                    console.log("freeInlineCompletions called");
                },
            };
        },
        [suggestion, suggestionPosition],
    );

    // Clear current suggestion
    const clearCurrentSuggestion = useCallback(() => {
        console.log("Clearing current suggestion");
        currentSuggestionRef.current = null;
        suggestionAcceptedRef.current = false;
        if (editorRef.current) {
            editorRef.current.trigger(
                "ai",
                "editor.action.inlineSuggest.hide",
                null,
            );
        }
    }, []);

    // Accept current suggestion with double-acceptance prevention
    // Check if there's an active inline suggestion at current position
    const hasActiveSuggestionAtPosition = useCallback(() => {
        if (!editorRef.current || !currentSuggestionRef.current) return false;

        const position = editorRef.current.getPosition();
        const suggestion = currentSuggestionRef.current;

        return (
            position.lineNumber === suggestion.position.line &&
            position.column >= suggestion.position.column &&
            position.column <= suggestion.position.column + 2
        );
    }, []);

    // Update inline completions when suggestion changes
    useEffect(() => {
        if (!editorRef.current || !monacoRef.current) return;

        const editor = editorRef.current;
        const monaco = monacoRef.current;

        console.log("Suggestion changed", {
            hasSuggestion: !!suggestion,
            hasPosition: !!suggestionPosition,
            isAccepting: isAcceptingSuggestionRef.current,
            suggestionAccepted: suggestionAcceptedRef.current,
        });

        // Don't update if we're in the middle of accepting a suggestion
        if (isAcceptingSuggestionRef.current || suggestionAcceptedRef.current) {
            console.log(
                "Skipping update - currently accepting/accepted suggestion",
            );
            return;
        }

        // Dispose previous provider
        if (inlineCompletionProviderRef.current) {
            inlineCompletionProviderRef.current?.dispose?.();
            inlineCompletionProviderRef.current = null;
            inlineCompletionProviderRef.current = null;
        }

        // Clear current suggestion reference
        currentSuggestionRef.current = null;

        // Register new provider if we have a suggestion
        if (suggestion && suggestionPosition) {
            console.log("Registering new inline completion provider");

            const language = getEditorLanguage(activeFile?.fileExtension || "");
            const provider = createInlineCompletionProvider(monaco);

            inlineCompletionProviderRef.current =
                monaco.languages.registerInlineCompletionsProvider(
                    language,
                    provider,
                );

            // Small delay to ensure editor is ready, then trigger suggestions
            setTimeout(() => {
                if (
                    editorRef.current &&
                    !isAcceptingSuggestionRef.current &&
                    !suggestionAcceptedRef.current
                ) {
                    console.log("Triggering inline suggestions");
                    editor.trigger(
                        "ai",
                        "editor.action.inlineSuggest.trigger",
                        null,
                    );
                }
            }, 50);
        }

        return () => {
            if (inlineCompletionProviderRef.current) {
                inlineCompletionProviderRef.current?.dispose?.();
                inlineCompletionProviderRef.current = null;
                inlineCompletionProviderRef.current = null;
            }
        };
    }, [
        suggestion,
        suggestionPosition,
        activeFile,
        createInlineCompletionProvider,
    ]);

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        editor.updateOptions({
            ...defaultEditorOptions,

            inlineSuggest: {
                enabled: true,
                mode: "prefix",
            },

            suggest: {
                preview: false,
            },

            quickSuggestions: {
                other: true,
                comments: false,
                strings: false,
            },
        });

        configureMonaco(monaco);

        // Ctrl + Space → trigger AI
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
            if (isAIEnabled) {
                onTriggerSuggestion("completion", editor);
            }
        });

        // ✅ LET MONACO HANDLE TAB (IMPORTANT)
        // DO NOT OVERRIDE TAB

        // Escape → reject suggestion
        editor.addCommand(monaco.KeyCode.Escape, () => {
            if (currentSuggestionRef.current) {
                onRejectSuggestion(editor);
                clearCurrentSuggestion();
            }
        });

        // Cursor movement → clear suggestion
        editor.onDidChangeCursorPosition((e: any) => {
            const newPosition = e.position;

            if (currentSuggestionRef.current) {
                const suggestionPos = currentSuggestionRef.current.position;

                if (
                    newPosition.lineNumber !== suggestionPos.line ||
                    newPosition.column < suggestionPos.column ||
                    newPosition.column > suggestionPos.column + 10
                ) {
                    clearCurrentSuggestion();
                    onRejectSuggestion(editor);
                }
            }

            // Trigger new suggestion
            if (!currentSuggestionRef.current && !suggestionLoading) {
                if (suggestionTimeoutRef.current) {
                    clearTimeout(suggestionTimeoutRef.current);
                }

                suggestionTimeoutRef.current = setTimeout(() => {
                    onTriggerSuggestion("completion", editor);
                }, 1000);
            }
        });

        // Content change → clear suggestion
        editor.onDidChangeModelContent((e: any) => {
            if (currentSuggestionRef.current && e.changes.length > 0) {
                clearCurrentSuggestion();
            }

            const change = e.changes[0];

            if (
                change?.text === "\n" ||
                change?.text === "." ||
                change?.text === "(" ||
                change?.text === "="
            ) {
                setTimeout(() => {
                    if (!currentSuggestionRef.current && !suggestionLoading) {
                        onTriggerSuggestion("completion", editor);
                    }
                }, 100);
            }
        });

        updateEditorLanguage();
    };

    const updateEditorLanguage = () => {
        if (!activeFile || !monacoRef.current || !editorRef.current) return;
        const model = editorRef.current.getModel();
        if (!model) return;

        const language = getEditorLanguage(activeFile.fileExtension || "");
        try {
            monacoRef.current.editor.setModelLanguage(model, language);
        } catch (error) {
            console.warn("Failed to set editor language:", error);
        }
    };

    useEffect(() => {
        updateEditorLanguage();
    }, [activeFile]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (suggestionTimeoutRef.current) {
                clearTimeout(suggestionTimeoutRef.current);
            }
            if (inlineCompletionProviderRef.current) {
                inlineCompletionProviderRef.current?.dispose?.();
                inlineCompletionProviderRef.current = null;
                inlineCompletionProviderRef.current = null;
            }
            if (tabCommandRef.current) {
                editorRef.current?.removeCommand?.(tabCommandRef.current);
                tabCommandRef.current = null;
                tabCommandRef.current = null;
            }
        };
    }, []);

    return (
        <div className="h-full relative">
            {/* Loading indicator */}
            {suggestionLoading && (
                <div className="absolute top-2 right-2 z-10 bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-xs text-red-700 dark:text-red-300 flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    AI thinking...
                </div>
            )}

            {/* Active suggestion indicator */}
            {currentSuggestionRef.current && !suggestionLoading && (
                <div className="absolute top-2 right-2 z-10 bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Press Tab to accept
                </div>
            )}

            <Editor
                height="100%"
                value={content}
                onChange={(value) => onContentChange(value || "")}
                onMount={handleEditorDidMount}
                language={
                    activeFile
                        ? getEditorLanguage(activeFile.fileExtension || "")
                        : "plaintext"
                }
                //@ts-ignore
                options={defaultEditorOptions}
            />
        </div>
    );
};
