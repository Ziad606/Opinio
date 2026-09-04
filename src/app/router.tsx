import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { PublicRoute } from "../features/auth/components/PublicRoute";
import { AdminRoute } from "../features/auth/components/AdminRoute";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import EmailConfirmation from "../features/auth/pages/EmailConfirmation";
import { routes } from "../config/constants";
import PollsDashboard from "../features/polls/pages/PollsDashboard";

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: routes.home,
                element: <App />,
            },
        ],
    },
    {
        element: <AdminRoute />,
        children: [
            {
                path: routes.admin.dashboard,
                element: <PollsDashboard />,
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
    { path: "*", element: <App /> },
]);
