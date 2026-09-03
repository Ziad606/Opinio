import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useSyncExternalStore } from "react";

export function PublicRoute() {
    const isHydrated = useSyncExternalStore(
        useAuthStore.persist.onFinishHydration,
        useAuthStore.persist.hasHydrated,
        () => false,
    );

    const isAuthenticated = useAuthStore((state) => !!state.accessToken);

    if (!isHydrated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p className="font-sans text-sm text-on-surface-variant">Loading...</p>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}
