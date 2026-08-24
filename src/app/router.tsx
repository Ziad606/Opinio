import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";

export const router = createBrowserRouter([
    // {
    //     element: <ProtectedRoute />,
    //     children: [
    //         {
    //             path: "/",
    //             element: <App />,
    //         },
    //     ],
    // },
    { path: "/", element: <App /> },
]);
