export default function App() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background">
            <div className="rounded-xl border bg-surface-container-lowest p-8 shadow-sm">
                <h1 className="font-display text-4xl font-bold text-primary">
                    Opinio
                </h1>

                <p className="mt-2 text-on-surface-variant">
                    Your survey platform.
                </p>

                <button className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary">
                    Get Started
                </button>
            </div>
        </main>
    );
}
