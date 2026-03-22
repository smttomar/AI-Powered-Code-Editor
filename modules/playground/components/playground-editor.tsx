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
}

const PlaygroundEditor = ({
    activeFile,
    content,
    onContentChange,
}: PlaygroundEditorProps) => {
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<Monaco | null>(null);

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
        console.log("Editor instance mounted:", !!editorRef.current);

        editor.updateOptions({
            ...defaultEditorOptions,
            // Enable inline suggestions but with specific settings to prevent conflicts
            inlineSuggest: {
                enabled: true,
                mode: "prefix",
                suppressSuggestions: false,
            },
            // Disable some conflicting suggest features
            suggest: {
                preview: false, // Disable preview to avoid conflicts
                showInlineDetails: false,
                insertMode: "replace",
            },
            // Quick suggestions
            quickSuggestions: {
                other: true,
                comments: false,
                strings: false,
            },
            // Smooth cursor
            cursorSmoothCaretAnimation: "on",
        });

        configureMonaco(monaco);

        // // Keyboard shortcuts
        // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
        //     console.log("Ctrl+Space pressed, triggering suggestion");
        //     onTriggerSuggestion("completion", editor);
        // });

        // // CRITICAL: Override Tab key with high priority and prevent default Monaco behavior
        // if (tabCommandRef.current) {
        //     tabCommandRef.current.dispose();
        // }

        // tabCommandRef.current = editor.addCommand(
        //     monaco.KeyCode.Tab,
        //     () => {
        //         console.log("TAB PRESSED", {
        //             hasSuggestion: !!currentSuggestionRef.current,
        //             hasActiveSuggestion: hasActiveSuggestionAtPosition(),
        //             isAccepting: isAcceptingSuggestionRef.current,
        //             suggestionAccepted: suggestionAcceptedRef.current,
        //         });

        //         // CRITICAL: Block if already processing
        //         if (isAcceptingSuggestionRef.current) {
        //             console.log(
        //                 "BLOCKED: Already in the process of accepting, ignoring Tab",
        //             );
        //             return;
        //         }

        //         // CRITICAL: Block if just accepted
        //         if (suggestionAcceptedRef.current) {
        //             console.log(
        //                 "BLOCKED: Suggestion was just accepted, using default tab",
        //             );
        //             editor.trigger("keyboard", "tab", null);
        //             return;
        //         }

        //         // If we have an active suggestion at the current position, try to accept it
        //         if (
        //             currentSuggestionRef.current &&
        //             hasActiveSuggestionAtPosition()
        //         ) {
        //             console.log("ATTEMPTING to accept suggestion with Tab");
        //             const accepted = acceptCurrentSuggestion();
        //             if (accepted) {
        //                 console.log(
        //                     "SUCCESS: Suggestion accepted via Tab, preventing default behavior",
        //                 );
        //                 return; // CRITICAL: Return here to prevent default tab behavior
        //             }
        //             console.log(
        //                 "FAILED: Suggestion acceptance failed, falling through to default",
        //             );
        //         }

        //         // Default tab behavior (indentation)
        //         console.log("DEFAULT: Using default tab behavior");
        //         editor.trigger("keyboard", "tab", null);
        //     },
        //     // CRITICAL: Use specific context to override Monaco's built-in Tab handling
        //     "editorTextFocus && !editorReadonly && !suggestWidgetVisible",
        // );

        // // Escape to reject
        // editor.addCommand(monaco.KeyCode.Escape, () => {
        //     console.log("Escape pressed");
        //     if (currentSuggestionRef.current) {
        //         onRejectSuggestion(editor);
        //         clearCurrentSuggestion();
        //     }
        // });

        // // Listen for cursor position changes to hide suggestions when moving away
        // editor.onDidChangeCursorPosition((e: any) => {
        //     if (isAcceptingSuggestionRef.current) return;

        //     const newPosition = e.position;

        //     // Clear existing suggestion if cursor moved away
        //     if (
        //         currentSuggestionRef.current &&
        //         !suggestionAcceptedRef.current
        //     ) {
        //         const suggestionPos = currentSuggestionRef.current.position;

        //         // If cursor moved away from suggestion position, clear it
        //         if (
        //             newPosition.lineNumber !== suggestionPos.line ||
        //             newPosition.column < suggestionPos.column ||
        //             newPosition.column > suggestionPos.column + 10
        //         ) {
        //             console.log("Cursor moved away from suggestion, clearing");
        //             clearCurrentSuggestion();
        //             onRejectSuggestion(editor);
        //         }
        //     }

        //     // Trigger new suggestion if appropriate (simplified)
        //     if (!currentSuggestionRef.current && !suggestionLoading) {
        //         // Clear any existing timeout
        //         if (suggestionTimeoutRef.current) {
        //             clearTimeout(suggestionTimeoutRef.current);
        //         }

        //         // Trigger suggestion with a delay
        //         suggestionTimeoutRef.current = setTimeout(() => {
        //             onTriggerSuggestion("completion", editor);
        //         }, 300);
        //     }
        // });

        // // Listen for content changes to detect manual typing over suggestions
        // editor.onDidChangeModelContent((e: any) => {
        //     if (isAcceptingSuggestionRef.current) return;

        //     // If user types while there's a suggestion, clear it (unless it's our insertion)
        //     if (
        //         currentSuggestionRef.current &&
        //         e.changes.length > 0 &&
        //         !suggestionAcceptedRef.current
        //     ) {
        //         const change = e.changes[0];

        //         // Check if this is our own suggestion insertion
        //         if (
        //             change.text === currentSuggestionRef.current.text ||
        //             change.text ===
        //                 currentSuggestionRef.current.text.replace(/\r/g, "")
        //         ) {
        //             console.log("Our suggestion was inserted, not clearing");
        //             return;
        //         }

        //         // User typed something else, clear the suggestion
        //         console.log("User typed while suggestion active, clearing");
        //         clearCurrentSuggestion();
        //     }

        //     // Trigger context-aware suggestions on certain typing patterns
        //     if (e.changes.length > 0 && !suggestionAcceptedRef.current) {
        //         const change = e.changes[0];

        //         // Trigger suggestions after specific characters
        //         if (
        //             change.text === "\n" || // New line
        //             change.text === "{" || // Opening brace
        //             change.text === "." || // Dot notation
        //             change.text === "=" || // Assignment
        //             change.text === "(" || // Function call
        //             change.text === "," || // Parameter separator
        //             change.text === ":" || // Object property
        //             change.text === ";" // Statement end
        //         ) {
        //             setTimeout(() => {
        //                 if (
        //                     editorRef.current &&
        //                     !currentSuggestionRef.current &&
        //                     !suggestionLoading
        //                 ) {
        //                     onTriggerSuggestion("completion", editor);
        //                 }
        //             }, 100); // Small delay to let the change settle
        //         }
        //     }
        // });

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

    return (
        <div className="h-full relative">
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
                // @ts-ignore
                options={defaultEditorOptions}
            />
        </div>
    );
};

export default PlaygroundEditor;
