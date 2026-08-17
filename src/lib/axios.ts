import axios from "axios";
import { env } from "../config/env";
import { useAuthStore } from "../features/auth/stores/auth.store";
import type { AuthResponse } from "../features/auth/types/auth-response";

declare module "axios" {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

let refreshPromise: Promise<string> | null = null;

export const apiClient = axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export const authClient = axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (!axios.isAxiosError(error)) {
            throw error;
        }

        if (error.response?.status !== 401) {
            throw error;
        }

        const originalRequest = error.config;

        if (!originalRequest) {
            throw error;
        }
        if (originalRequest._retry) {
            throw error;
        }

        originalRequest._retry = true;

        if (!refreshPromise) {
            refreshPromise = refreshAccessToken().finally(() => {
                refreshPromise = null;
            });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
    },
);

async function refreshAccessToken(): Promise<string> {
    const { accessToken, refreshToken } = useAuthStore.getState();

    if (!accessToken || !refreshToken) {
        throw new Error("No refresh token available");
    }

    const response = await authClient.post<AuthResponse>("/auth/refresh", {
        token: accessToken,
        refreshToken,
    });

    useAuthStore.getState().setAuth(response.data);

    return response.data.token;
}
