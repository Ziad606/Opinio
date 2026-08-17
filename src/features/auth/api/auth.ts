import { authClient } from "../../../lib/axios";
import type { AuthResponse } from "../types/auth-response";
import type { LoginRequest } from "../types/login-request";
import type { RefreshTokenRequest } from "../types/refresh-token-request";

export const authService = {
    login: async (request: LoginRequest): Promise<AuthResponse> => {
        const response = await authClient.post<AuthResponse>("/auth", request);

        return response.data;
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
};
