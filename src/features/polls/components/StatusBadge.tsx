import type { PollStatus } from "../types/poll";

interface StatusBadgeProps {
    status: PollStatus;
}

const statusStyles: Record<PollStatus, string> = {
    Published: "bg-primary text-on-primary",
    Active: "bg-[#E8E0D4] text-on-surface",
    Disabled: "bg-[#E5E5E5] text-on-surface-variant",
};

export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-semibold ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}
