export interface Poll {
    id: number;
    title: string;
    summary: string;
    isPublished: boolean;
    startsAt: string;
    endsAt: string;
}

export type PollStatus = "Published" | "Active" | "Disabled";

export interface PollWithTarget extends Poll {
    target: string;
    status: PollStatus;
}
