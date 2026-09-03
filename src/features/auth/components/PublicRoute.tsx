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
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}
