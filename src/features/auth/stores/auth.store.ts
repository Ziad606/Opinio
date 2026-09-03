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

    setAuth: (auth: AuthResponse) => void;
    clearAuth: () => void;
}

function extractRolesFromToken(token: string): string[] {
    try {
        const base64Url = token.split(".")[1];
        if (!base64Url) return [];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join(""),
        );
        const payload = JSON.parse(jsonPayload);
        const roleClaim =
            payload.role ||
            payload.roles ||
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (!roleClaim) return [];
        return Array.isArray(roleClaim) ? roleClaim : [roleClaim];
    } catch {
        return [];
    }
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,

            accessToken: null,
            refreshToken: null,

            accessTokenExpiresIn: null,
            refreshTokenExpiration: null,

            setAuth: (auth) => {
                const roles = extractRolesFromToken(auth.token);
                set({
                    user: {
                        id: auth.id,
                        firstName: auth.firstName,
                        lastName: auth.lastName,
                        email: auth.email,
                        roles: roles.length > 0 ? roles : ["Admin"],
                    },

                    accessToken: auth.token,
                    refreshToken: auth.refreshToken,

                    accessTokenExpiresIn: auth.expiresIn,
                    refreshTokenExpiration: auth.refreshTokenExpiration,
                });
            },

            clearAuth: () =>
                set({
                    user: null,

                    accessToken: null,
                    refreshToken: null,

                    accessTokenExpiresIn: null,
                    refreshTokenExpiration: null,
                }),
        }),
        {
            name: "opinio-auth",
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                accessTokenExpiresIn: state.accessTokenExpiresIn,
                refreshTokenExpiration: state.refreshTokenExpiration,
            }),
        },
    ),
);
