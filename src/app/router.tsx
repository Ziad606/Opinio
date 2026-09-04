import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { PublicRoute } from "../features/auth/components/PublicRoute";
import { AdminRoute } from "../features/auth/components/AdminRoute";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import EmailConfirmation from "../features/auth/pages/EmailConfirmation";
import { routes } from "../config/constants";
import PollsDashboard from "../features/polls/pages/PollsDashboard";
import PollManagement from "../features/polls/pages/PollManagement";
import { AppLayout } from "../components/layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={routes.home} replace />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: routes.home,
                element: (
                    <AppLayout>
                        <PollsDashboard />
                    </AppLayout>
                ),
            },
        ],
    },
    {
        element: <AdminRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: routes.admin.dashboard,
                        element: <PollsDashboard />,
                    },
                    {
                        path: routes.admin.pollManagement,
                        element: <PollManagement />,
                    },
                ],
            },
        ],
    },
    {
        element: <PublicRoute />,
        children: [
            { path: routes.auth.login, element: <Login /> },
            { path: routes.auth.register, element: <Register /> },
            {
                path: routes.auth.emailConfirmation,
                element: <EmailConfirmation />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={routes.home} replace />,
    },
]);
