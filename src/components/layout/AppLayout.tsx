import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
    children?: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">{children || <Outlet />}</main>
            </div>
        </div>
    );
}
