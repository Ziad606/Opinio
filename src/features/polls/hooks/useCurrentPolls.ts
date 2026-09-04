import { useQuery } from "@tanstack/react-query";
import { pollService } from "../api/polls";

export function useCurrentPolls() {
    return useQuery({
        queryKey: ["polls", "current"],
        queryFn: pollService.getCurrentPolls,
    });
}
