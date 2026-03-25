export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-sm text-zinc-800">
            <h1 className="text-3xl font-bold mb-6 text-white">
                Terms of Service
            </h1>

            <p className="mb-4">
                By using this platform, you agree to the following terms and
                conditions.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
                1. Usage
            </h2>
            <p>
                This platform provides an AI-powered code editor for learning
                and development purposes. You agree not to misuse the service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
                2. User Content
            </h2>
            <p>
                You are responsible for any code or data you create or upload.
                We do not claim ownership of your content.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
                3. AI Usage
            </h2>
            <p>
                AI-generated suggestions may not always be accurate. You are
                responsible for reviewing any generated code.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
                4. Limitation of Liability
            </h2>
            <p>
                We are not liable for any damages resulting from the use of this
                platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
                5. Changes
            </h2>
            <p>We may update these terms at any time without prior notice.</p>

            <p className="mt-8 text-zinc-500">
                Last updated: {new Date().toDateString()}
            </p>
        </div>
    );
}
