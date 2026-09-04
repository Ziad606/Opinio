import { Card } from "../../../components/ui/Card";

export default function StatCard({
    label,
    value,
    icon,
    sub,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    sub?: React.ReactNode;
}) {
    return (
        <Card className="flex flex-col gap-3 p-6">
            <div className="flex items-start justify-between">
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                    {label}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                    {icon}
                </span>
            </div>
            <span className="font-display text-5xl font-bold text-primary">
                {value}
            </span>
            {sub && <div>{sub}</div>}
        </Card>
    );
}
