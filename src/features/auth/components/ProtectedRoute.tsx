import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export function ProtectedRoute() {
    const isHydrated = useAuthStore((state) => state.isHydrated);

    const isAuthenticated = useAuthStore((state) => !!state.accessToken);

    const location = useLocation();

    if (!isHydrated) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
