import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useSyncExternalStore } from "react";
import { routes } from "../../../config/constants";

export function AdminRoute() {
    const isHydrated = useSyncExternalStore(
        useAuthStore.persist.onFinishHydration,
        useAuthStore.persist.hasHydrated,
        () => false,
    );

    const user = useAuthStore((state) => state.user);
    const accessToken = useAuthStore((state) => state.accessToken);
    const location = useLocation();

    if (!isHydrated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p className="font-sans text-sm text-on-surface-variant">Loading...</p>
            </div>
        );
    }

    if (!accessToken) {
        return <Navigate to={routes.auth.login} replace state={{ from: location }} />;
    }

    if (user?.role?.toLowerCase() !== "admin") {
        return <Navigate to={routes.home} replace />;
    }

    return <Outlet />;
}
