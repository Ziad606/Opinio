function getDaysUntilEnd(endsAt: string): number {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const end = new Date(endsAt);
    end.setHours(0, 0, 0, 0);
    return Math.round((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function EndLabel({ endsAt }: { endsAt: string }) {
    const days = getDaysUntilEnd(endsAt);

    if (days < 0)
        return <span className="text-sm text-on-surface-variant">Ended</span>;
    if (days === 0)
        return (
            <span className="animate-pulse text-sm font-semibold text-warning">
                Ends today
            </span>
        );
    if (days === 1)
        return (
            <span className="text-sm text-on-surface-variant">
                Ends in 1 day
            </span>
        );
    return (
        <span className="text-sm text-on-surface-variant">
            Ends in {days} days
        </span>
    );
}
