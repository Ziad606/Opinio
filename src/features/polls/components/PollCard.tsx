import { Users } from "lucide-react";
import { Button, Card } from "../../../components/ui";
import type { Poll } from "../types/poll";
import EndLabel from "./EndLabel";

export default function PollCard({ poll }: { poll: Poll }) {
    return (
        <Card className="flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Active
                </span>
                <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                    <Users className="h-4 w-4" />
                    {poll.id * 312}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="font-sans text-base font-bold text-on-surface line-clamp-1">
                    {poll.title}
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2">
                    {poll.summary}
                </p>
            </div>

            <div className="border-t border-border" />

            <div className="flex items-center justify-between">
                <EndLabel endsAt={poll.endsAt} />
                <Button
                    variant="secondary"
                    className="!h-8 !rounded-full !px-4 !text-xs font-semibold"
                >
                    View / Vote
                </Button>
            </div>
        </Card>
    );
}
