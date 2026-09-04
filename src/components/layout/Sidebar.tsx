import {
    Plus,
    LayoutDashboard,
    Vote,
    BarChart3,
    ShieldCheck,
    Settings,
} from "lucide-react";
import { useAuthStore } from "../../features/auth/stores/auth.store";
import { Button } from "../ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../../config/constants";

interface SidebarProps {
    onCreatePoll?: () => void;
}

export function Sidebar({ onCreatePoll }: SidebarProps) {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    const isAdmin = user?.role?.toLowerCase() === "admin";

    if (!isAdmin) {
        return null;
    }

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: routes.admin.dashboard },
        { label: "Poll Management", icon: Vote, path: routes.admin.pollManagement },
        { label: "Data Analytics", icon: BarChart3, path: "#" },
        { label: "User Roles", icon: ShieldCheck, path: "#" },
        { label: "Settings", icon: Settings, path: "#" },
    ];

    const handleSelect = (path: string) => {
        if (path !== "#") {
            navigate(path);
        }
    };

    return (
        <aside className="flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-border bg-surface p-4">
            <div className="mb-6 px-2">
                <h2 className="font-display text-xl font-bold text-on-surface">
                    Admin Panel
                </h2>
                <p className="font-sans text-xs text-on-surface-variant">
                    Opinion Management
                </p>
            </div>

            <div className="mb-6">
                <Button
                    variant="primary"
                    onClick={onCreatePoll}
                    className="w-full justify-center gap-2 !rounded-xl font-semibold"
                >
                    <Plus className="h-5 w-5" />
                    Create New Poll
                </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => handleSelect(item.path)}
                            disabled={item.path === "#"}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-primary-fixed text-primary font-bold"
                                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                            } ${item.path === "#" ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                            <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-on-surface-variant"}`} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
