import { Button, Card, Input, Label } from "../components/ui";

export default function App() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-6">
            <Card className="w-full max-w-md p-8">
                <h1 className="font-display text-4xl font-bold text-primary">
                    Opinio
                </h1>

                <p className="mt-2 text-on-surface-variant">
                    Create and manage your surveys.
                </p>
            </Card>
        </main>
    );
}
