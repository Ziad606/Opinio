import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useSyncExternalStore } from "react";

export function ProtectedRoute() {
    const isHydrated = useSyncExternalStore(
        useAuthStore.persist.onFinishHydration,
        useAuthStore.persist.hasHydrated,
        () => false,
    );

    const isAuthenticated = useAuthStore((state) => !!state.accessToken);

    const location = useLocation();

    if (!isHydrated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p className="font-sans text-sm text-on-surface-variant">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
