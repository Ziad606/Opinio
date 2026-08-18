import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth";
import { useAuthStore } from "../stores/auth.store";

export function useLogout() {
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useMutation({
        mutationFn: async () => {
            const { accessToken, refreshToken } = useAuthStore.getState();

            if (!accessToken || !refreshToken) {
                return;
            }

            await authService.revokeRefreshToken(accessToken, refreshToken);
        },

        onSettled: () => {
            clearAuth();
        },
    });
}
