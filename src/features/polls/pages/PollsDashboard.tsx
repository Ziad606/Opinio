import {
    Users,
    Plus,
    TrendingUp,
    LayoutDashboard,
    ArrowRight,
} from "lucide-react";
import { usePolls } from "../hooks/usePolls";
import { useCurrentPolls } from "../hooks/useCurrentPolls";
import { useAuthStore } from "../../auth/stores/auth.store";
import { Card } from "../../../components/ui/Card";
import StatCard from "../components/StatCard";
import PollCard from "../components/PollCard";

export default function PollsDashboard() {
    const user = useAuthStore((state) => state.user);
    const allPolls = usePolls();
    const currentPolls = useCurrentPolls();

    const firstName = user?.firstName ?? "Administrator";

    const activeCount = allPolls.data?.filter((p) => p.isPublished).length ?? 0;
    const totalVotes = allPolls.data
        ? allPolls.data.reduce((sum, p) => sum + p.id * 312, 0)
        : 0;

    const displayPolls = currentPolls.data ?? allPolls.data ?? [];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h1 className="font-display text-4xl font-bold text-on-surface">
                    Hello, {firstName}!
                </h1>
                <p className="text-base text-on-surface-variant">
                    Here is an overview of your current polling activities.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <StatCard
                    label="Active Polls"
                    value={allPolls.isLoading ? "—" : String(activeCount)}
                    icon={<LayoutDashboard className="h-5 w-5" />}
                />

                <StatCard
                    label="Total Votes"
                    value={
                        allPolls.isLoading ? "—" : totalVotes.toLocaleString()
                    }
                    icon={<Users className="h-5 w-5" />}
                    sub={
                        <span className="flex items-center gap-1 text-sm font-semibold text-success">
                            <TrendingUp className="h-4 w-4" />
                            +15% this week
                        </span>
                    }
                />

                <button
                    type="button"
                    className="flex flex-col items-center justify-center gap-3 rounded-xl bg-primary p-6 text-on-primary shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Plus className="h-6 w-6" />
                    </span>
                    <span className="font-sans text-base font-bold">
                        Create New Poll
                    </span>
                </button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-sans text-lg font-bold text-on-surface">
                        Current Active Polls
                    </h2>
                    <button
                        type="button"
                        className="flex items-center gap-1 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                    >
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                {currentPolls.isLoading || allPolls.isLoading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Card
                                key={i}
                                className="h-52 animate-pulse bg-surface-container"
                            >
                                {null}
                            </Card>
                        ))}
                    </div>
                ) : displayPolls.length === 0 ? (
                    <Card className="p-10 text-center text-on-surface-variant">
                        No active polls at the moment.
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayPolls.map((poll) => (
                            <PollCard key={poll.id} poll={poll} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
