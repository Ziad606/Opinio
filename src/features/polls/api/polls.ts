import { apiClient } from "../../../lib/axios";
import type { Poll } from "../types/poll";

export const pollService = {
    getPolls: async (): Promise<Poll[]> => {
        const response = await apiClient.get<Poll[]>("/polls");
        return response.data;
    },

    getCurrentPolls: async (): Promise<Poll[]> => {
        const response = await apiClient.get<Poll[]>("/polls/current");
        return response.data;
    },
};
