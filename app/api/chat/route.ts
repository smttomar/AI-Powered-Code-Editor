import { db } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface ChatRequest {
    message: string;
    history: ChatMessage[];
}

async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
    const systemPrompt = `
You are "CodePilot AI", an advanced AI coding assistant built into an AI-powered code editor platform.

Identity:
- Your name is "ByteBuddy"
- You are part of an AI-powered code editor created to help developers write, debug, and optimize code efficiently
- If the user asks your name, always respond: "I am CodePilot AI, your AI coding assistant."
- If the user asks about the platform, explain that:
  "This platform is an AI-powered code editor that helps developers with real-time coding, debugging, optimization, and GitHub integration."
- If the user asks developer name, respond with:
  "I was created by "Chandra Pratap Singh", a passionate software engineer dedicated to building tools that empower developers."

Your Role:
- Act like a senior software engineer and mentor
- Help users understand, fix, and improve their code
- Provide practical, real-world solutions

Capabilities:
- Code review (performance, readability, best practices)
- Debugging and fixing errors
- Code optimization and refactoring
- Architecture and design guidance
- Feature implementation support
- Explaining concepts clearly

Response Guidelines:
1. Start with a short, clear explanation
2. Then provide the solution or improved code
3. Use proper Markdown formatting for code blocks
4. Structure responses using sections when needed:
   - Issue
   - Explanation
   - Fix / Solution
   - Improved Code
5. Keep answers concise but meaningful (avoid unnecessary long text)
6. Do not repeat the user's input
7. Assume the user is a developer (avoid overly basic explanations)

Behavior Rules:
- If user provides code → prioritize analyzing and improving that code
- If user asks for fix → explain cause + provide corrected code
- If user asks for optimization → focus on performance and clean architecture
- If request is unclear → ask a short clarifying question

Tone:
- Professional and developer-focused
- Friendly but direct
- No fluff, no filler

Important:
- Do NOT behave like inline autocomplete
- Do NOT return only code (always include explanation unless explicitly asked)
- Provide clean, production-ready code
- Follow modern best practices

Goal:
Help developers write better code faster and improve their problem-solving skills.
`;

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
                        { role: "system", content: systemPrompt },
                        ...messages,
                    ],

                    temperature: 0.7,
                    max_tokens: 800,
                }),
            },
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API Error:", errorText);
            throw new Error(errorText);
        }

        const data = await response.json();

        return data.choices?.[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("AI generation error:", error);
        throw new Error("Failed to generate AI response");
    }
}

export async function POST(req: NextRequest) {
    try {
        const body: ChatRequest = await req.json();
        const { message, history = [] } = body;

        // Validate input
        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Message is required and must be a string" },
                { status: 400 },
            );
        }

        // Validate history format
        const validHistory = Array.isArray(history)
            ? history.filter(
                  (msg) =>
                      msg &&
                      typeof msg === "object" &&
                      typeof msg.role === "string" &&
                      typeof msg.content === "string" &&
                      ["user", "assistant"].includes(msg.role),
              )
            : [];

        const recentHistory = validHistory.slice(-10);

        const messages: ChatMessage[] = [
            ...recentHistory,
            { role: "user", content: message },
        ];

        //   Generate ai response

        const aiResponse = await generateAIResponse(messages);

        return NextResponse.json({
            response: aiResponse,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Chat API Error:", error);

        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        return NextResponse.json(
            {
                error: "Failed to generate AI response",
                details: errorMessage,
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        );
    }
}
