import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse } from "../types/auth-response";
import type { AuthUser } from "../types/auth-user";

interface AuthState {
    user: AuthUser | null;

    accessToken: string | null;
    refreshToken: string | null;

    accessTokenExpiresIn: number | null;
    refreshTokenExpiration: string | null;

    isAuthenticated: boolean;

    setAuth: (auth: AuthResponse) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,

            accessToken: null,
            refreshToken: null,

            accessTokenExpiresIn: null,
            refreshTokenExpiration: null,
            isAuthenticated: false,

            setAuth: (auth) =>
                set({
                    user: {
                        id: auth.id,
                        firstName: auth.firstName,
                        lastName: auth.lastName,
                        email: auth.email,
                    },

                    accessToken: auth.token,
                    refreshToken: auth.refreshToken,

                    accessTokenExpiresIn: auth.expiresIn,
                    refreshTokenExpiration: auth.refreshTokenExpiration,
                    isAuthenticated: true,
                }),

            clearAuth: () =>
                set({
                    user: null,

                    accessToken: null,
                    refreshToken: null,

                    accessTokenExpiresIn: null,
                    refreshTokenExpiration: null,
                    isAuthenticated: true,
                }),
        }),
        {
            name: "opinio-auth",
        },
    ),
);
