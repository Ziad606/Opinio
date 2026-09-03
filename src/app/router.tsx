import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { PublicRoute } from "../features/auth/components/PublicRoute";
import Login from "../features/auth/pages/Login";

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
            { path: "/login", element: <Login /> },
        ],
    },
    { path: "*", element: <App /> },
]);
