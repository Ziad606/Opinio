import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { PublicRoute } from "../features/auth/components/PublicRoute";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import EmailConfirmation from "../features/auth/pages/EmailConfirmation";

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/home",
                element: <App />,
            },
        ],
    },
    {
        element: <PublicRoute />,
        children: [
            { path: "/auth/login", element: <Login /> },
            { path: "/auth/register", element: <Register /> },
            { path: "/auth/emailConfirmation", element: <EmailConfirmation /> },
        ],
    },
    { path: "*", element: <App /> },
]);
