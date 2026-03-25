export default function DocsPage() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 text-zinc-800 dark:text-zinc-200">
            <h1 className="text-3xl font-bold mb-6">Documentation</h1>

            <p className="mb-6">
                Welcome to the AI Powered Code Editor documentation.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                🚀 Getting Started
            </h2>
            <p>
                Create a new playground, choose a template, and start coding
                instantly.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">🤖 AI Features</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li>Code completion</li>
                <li>Bug fixing suggestions</li>
                <li>Code explanations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">📁 Templates</h2>
            <p>
                You can choose from multiple templates like React, Next.js,
                Express, etc.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">🖥️ Playground</h2>
            <p>
                Edit code, preview output, and run your projects in real-time.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                🔐 Authentication
            </h2>
            <p>Sign in using GitHub or Google to save your projects.</p>
        </div>
    );
}
