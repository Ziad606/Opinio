import { AppLayout } from "../components/layout";
import { Card } from "../components/ui";

export default function App() {
    return (
        <AppLayout>
            <Card className="p-8">
                <h1 className="font-display text-3xl font-bold text-primary">
                    Poll Management
                </h1>
                <p className="mt-2 text-on-surface-variant">
                    Create, edit, and manage your surveys and polls.
                </p>
            </Card>
        </AppLayout>
    );
}
