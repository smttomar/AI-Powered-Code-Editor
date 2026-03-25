export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-sm text-zinc-800 dark:text-zinc-200">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4">
                Your privacy is important to us. This policy explains how we
                collect and use your data.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                1. Information We Collect
            </h2>
            <p>
                We may collect basic account information such as email and name
                when you sign in.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Usage Data</h2>
            <p>We may collect anonymous usage data to improve the platform.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
            <p>
                We may use cookies for authentication and improving user
                experience.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                4. Third-Party Services
            </h2>
            <p>
                We use third-party services like GitHub/Google for
                authentication.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                5. Data Security
            </h2>
            <p>We take reasonable measures to protect your data.</p>

            <p className="mt-8 text-zinc-500">
                Last updated: {new Date().toDateString()}
            </p>
        </div>
    );
}
