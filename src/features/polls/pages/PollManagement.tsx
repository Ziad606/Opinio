import type { PollWithTarget, PollStatus } from "../types/poll";
import { PollsTable } from "../components/PollsTable";
import { usePolls } from "../hooks/usePolls";
import type { Poll } from "../types/poll";

function derivePollStatus(poll: Poll): PollStatus {
    if (!poll.isPublished) return "Disabled";
    
    const now = new Date();
    const start = new Date(poll.startsAt);
    const end = new Date(poll.endsAt);
    
    if (now >= start && now <= end) return "Active";
    return "Published";
}

function enrichPollWithTarget(poll: Poll): PollWithTarget {
    return {
        ...poll,
        target: "General",
        status: derivePollStatus(poll),
    };
}

export default function PollManagement() {
    const { data: polls, isLoading, error } = usePolls();

    const handleEdit = (pollId: number) => {
        console.log("Edit poll:", pollId);
    };

    const handleDelete = (pollId: number) => {
        console.log("Delete poll:", pollId);
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
                <p className="font-sans text-base text-error">Failed to load polls</p>
            </div>
        );
    }

    const enrichedPolls = polls?.map(enrichPollWithTarget) ?? [];

    return (
        <div className="flex flex-col gap-8">
            <div className="relative flex flex-col gap-1">
                <div className="absolute -right-2 -top-2 h-6 w-6">
                    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-primary">
                        <path d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z" fill="currentColor" />
                    </svg>
                </div>
                <h1 className="font-display text-4xl font-bold text-on-surface">
                    Polls
                </h1>
                <p className="text-base text-on-surface-variant">
                    Manage, edit, and review active surveys and questionnaires.
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <p className="font-sans text-sm text-on-surface-variant">Loading polls...</p>
                </div>
            ) : (
                <PollsTable
                    polls={enrichedPolls}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
