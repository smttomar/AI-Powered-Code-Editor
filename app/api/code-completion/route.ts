import { type NextRequest, NextResponse } from "next/server";

interface CodeSuggestionRequest {
    fileContent: string;
    cursorLine: number;
    cursorColumn: number;
    suggestionType: string;
    fileName?: string;
}

interface CodeContext {
    language: string;
    framework: string;
    beforeContext: string;
    currentLine: string;
    afterContext: string;
    cursorPosition: { line: number; column: number };
    isInFunction: boolean;
    isInClass: boolean;
    isAfterComment: boolean;
    incompletePatterns: string[];
}

export async function POST(request: NextRequest) {
    try {
        const body: CodeSuggestionRequest = await request.json();
        const {
            fileContent,
            cursorLine,
            cursorColumn,
            suggestionType,
            fileName,
        } = body;

        // Validate input
        if (
            !fileContent ||
            cursorLine < 0 ||
            cursorColumn < 0 ||
            !suggestionType
        ) {
            return NextResponse.json(
                { error: "Invalid input parameters" },
                { status: 400 },
            );
        }

        // Analyze code context
        const context = analyzeCodeContext(
            fileContent,
            cursorLine,
            cursorColumn,
            fileName,
        );

        // Build AI prompt
        const prompt = buildPrompt(context, suggestionType);

        // Call AI service (replace with your AI service)
        const suggestion = await generateSuggestion(prompt);

        return NextResponse.json({
            suggestion,
            context,
            metadata: {
                language: context.language,
                framework: context.framework,
                position: context.cursorPosition,
                generatedAt: new Date().toISOString(),
            },
        });
    } catch (error: any) {
        console.error("Context analysis error:", error);
        return NextResponse.json(
            { error: "Internal server error", message: error.message },
            { status: 500 },
        );
    }
}

/**
 * Analyze the code context around the cursor position
 */
function analyzeCodeContext(
    content: string,
    line: number,
    column: number,
    fileName?: string,
): CodeContext {
    const lines = content.split("\n");
    const currentLine = lines[line] || "";

    // Get surrounding context (10 lines before and after)
    const contextRadius = 10;
    const startLine = Math.max(0, line - contextRadius);
    const endLine = Math.min(lines.length, line + contextRadius);

    const beforeContext = lines.slice(startLine, line).join("\n");
    const afterContext = lines.slice(line + 1, endLine).join("\n");

    // Detect language and framework
    const language = detectLanguage(content, fileName);
    const framework = detectFramework(content);

    // Analyze code patterns
    const isInFunction = detectInFunction(lines, line);
    const isInClass = detectInClass(lines, line);
    const isAfterComment = detectAfterComment(currentLine, column);
    const incompletePatterns = detectIncompletePatterns(currentLine, column);

    return {
        language,
        framework,
        beforeContext,
        currentLine,
        afterContext,
        cursorPosition: { line, column },
        isInFunction,
        isInClass,
        isAfterComment,
        incompletePatterns,
    };
}

/**
 * Build AI prompt based on context
 */
// function buildPrompt(context: CodeContext, suggestionType: string): string {
//     return `You are an expert code completion assistant. Generate a ${suggestionType} suggestion.

// Language: ${context.language}
// Framework: ${context.framework}

// Context:
// ${context.beforeContext}
// ${context.currentLine.substring(0, context.cursorPosition.column)}|CURSOR|${context.currentLine.substring(context.cursorPosition.column)}
// ${context.afterContext}

// Analysis:
// - In Function: ${context.isInFunction}
// - In Class: ${context.isInClass}
// - After Comment: ${context.isAfterComment}
// - Incomplete Patterns: ${context.incompletePatterns.join(", ") || "None"}

// Instructions:
// 1. Provide only the code that should be inserted at the cursor
// 2. Maintain proper indentation and style
// 3. Follow ${context.language} best practices
// 4. Make the suggestion contextually appropriate

// Generate suggestion:`;
// }

function buildPrompt(context: CodeContext, suggestionType: string): string {
    return `
You are CodePilot AI — an expert inline code completion engine.

Task:
Generate a ${suggestionType} code completion at the cursor position.

Language: ${context.language}
Framework: ${context.framework}

Full Context:
${context.beforeContext}
${context.currentLine.substring(0, context.cursorPosition.column)}|CURSOR|${context.currentLine.substring(context.cursorPosition.column)}
${context.afterContext}

Code Analysis:
- Inside Function: ${context.isInFunction}
- Inside Class: ${context.isInClass}
- After Comment: ${context.isAfterComment}
- Incomplete Patterns: ${context.incompletePatterns.join(", ") || "None"}

Strict Rules (VERY IMPORTANT):
1. Output ONLY the code to insert at |CURSOR|
2. DO NOT include explanations, comments, or markdown
3. DO NOT repeat existing code
4. DO NOT include backticks or code fences
5. Ensure syntax is valid and complete
6. Keep suggestion minimal and precise
7. Match existing code style and indentation exactly
8. If inside a function/class → respect scope and variables
9. If after a comment → generate relevant implementation
10. If no useful suggestion → return an empty string

Behavior Guidelines:
- Prefer completing the current line before generating new lines
- Respect naming conventions already used in the file
- Use modern ${context.language} best practices
- Avoid unnecessary imports or boilerplate unless required
- Ensure the suggestion fits naturally at the cursor

Output:
`;
}

/**
 * Generate suggestion using AI service
 */
async function generateSuggestion(prompt: string): Promise<string> {
    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",

                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],

                    temperature: 0.7,
                    max_tokens: 300,
                }),
            },
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API Error:", errorText);
            throw new Error(`AI service error: ${errorText}`);
        }

        const data = await response.json();

        let suggestion = data.choices?.[0]?.message?.content || "";

        // Clean code block
        if (suggestion.includes("```")) {
            const codeMatch = suggestion.match(/```[\w]*\n?([\s\S]*?)```/);
            suggestion = codeMatch ? codeMatch[1].trim() : suggestion;
        }

        suggestion = suggestion.replace(/\|CURSOR\|/g, "").trim();

        return suggestion;
    } catch (error) {
        console.error("AI generation error:", error);
        return "// AI suggestion unavailable";
    }
}

// Helper functions for code analysis
function detectLanguage(content: string, fileName?: string): string {
    if (fileName) {
        const ext = fileName.split(".").pop()?.toLowerCase();
        const extMap: Record<string, string> = {
            ts: "TypeScript",
            tsx: "TypeScript",
            js: "JavaScript",
            jsx: "JavaScript",
            py: "Python",
            java: "Java",
            go: "Go",
            rs: "Rust",
            php: "PHP",
        };
        if (ext && extMap[ext]) return extMap[ext];
    }

    // Content-based detection
    if (content.includes("interface ") || content.includes(": string"))
        return "TypeScript";
    if (content.includes("def ") || content.includes("import "))
        return "Python";
    if (content.includes("func ") || content.includes("package ")) return "Go";

    return "JavaScript";
}

function detectFramework(content: string): string {
    if (content.includes("import React") || content.includes("useState"))
        return "React";
    if (content.includes("import Vue") || content.includes("<template>"))
        return "Vue";
    if (content.includes("@angular/") || content.includes("@Component"))
        return "Angular";
    if (content.includes("next/") || content.includes("getServerSideProps"))
        return "Next.js";

    return "None";
}

function detectInFunction(lines: string[], currentLine: number): boolean {
    for (let i = currentLine - 1; i >= 0; i--) {
        const line = lines[i];
        if (line?.match(/^\s*(function|def|const\s+\w+\s*=|let\s+\w+\s*=)/))
            return true;
        if (line?.match(/^\s*}/)) break;
    }
    return false;
}

function detectInClass(lines: string[], currentLine: number): boolean {
    for (let i = currentLine - 1; i >= 0; i--) {
        const line = lines[i];
        if (line?.match(/^\s*(class|interface)\s+/)) return true;
    }
    return false;
}

function detectAfterComment(line: string, column: number): boolean {
    const beforeCursor = line.substring(0, column);
    return /\/\/.*$/.test(beforeCursor) || /#.*$/.test(beforeCursor);
}

function detectIncompletePatterns(line: string, column: number): string[] {
    const beforeCursor = line.substring(0, column);
    const patterns: string[] = [];

    if (/^\s*(if|while|for)\s*\($/.test(beforeCursor.trim()))
        patterns.push("conditional");
    if (/^\s*(function|def)\s*$/.test(beforeCursor.trim()))
        patterns.push("function");
    if (/\{\s*$/.test(beforeCursor)) patterns.push("object");
    if (/\[\s*$/.test(beforeCursor)) patterns.push("array");
    if (/=\s*$/.test(beforeCursor)) patterns.push("assignment");
    if (/\.\s*$/.test(beforeCursor)) patterns.push("method-call");

    return patterns;
}
