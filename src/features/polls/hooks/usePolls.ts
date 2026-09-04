import { useQuery } from "@tanstack/react-query";
import { pollService } from "../api/polls";

export function usePolls() {
    return useQuery({
        queryKey: ["polls"],
        queryFn: pollService.getPolls,
    });
}
