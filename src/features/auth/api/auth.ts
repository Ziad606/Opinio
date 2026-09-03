import { authClient } from "../../../lib/axios";
import type { AuthResponse } from "../types/auth-response";
import type { LoginRequest } from "../types/login-request";
import type { RefreshTokenRequest } from "../types/refresh-token-request";
import type { RegisterRequest } from "../types/register-request";

export const authService = {
    login: async (request: LoginRequest): Promise<AuthResponse> => {
        const response = await authClient.post<AuthResponse>("/auth", request);

        return response.data;
    },

    register: async (request: RegisterRequest): Promise<void> => {
        await authClient.post("/Auth/register", request);
    },

    confirmEmail: async (userId: string, code: string): Promise<void> => {
        await authClient.post("/Auth/confirm-email", { userId, code });
    },

    resendConfirmEmail: async (email: string): Promise<void> => {
        await authClient.post("/Auth/resend-confirm-email", { email });
    },

    refreshToken: async (
        request: RefreshTokenRequest,
    ): Promise<AuthResponse> => {
        const response = await authClient.post<AuthResponse>(
            "/auth/refresh",
            request,
        );

        return response.data;
    },

    revokeRefreshToken: async (
        token: string,
        refreshToken: string,
    ): Promise<void> => {
        await authClient.put("/auth/revoke-refresh-token", {
            token,
            refreshToken,
        });
    },
};
