import { useState } from "react";
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

interface SidebarProps {
    activeNav?: string;
    onNavSelect?: (item: string) => void;
    onCreatePoll?: () => void;
}

export function Sidebar({
    activeNav = "Poll Management",
    onNavSelect,
    onCreatePoll,
}: SidebarProps) {
    const user = useAuthStore((state) => state.user);
    const [currentNav, setCurrentNav] = useState(activeNav);

    const isAdmin =
        user?.roles?.some((r) => r.toLowerCase() === "admin") ?? true;

    if (!isAdmin) {
        return null;
    }

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard },
        { label: "Poll Management", icon: Vote },
        { label: "Data Analytics", icon: BarChart3 },
        { label: "User Roles", icon: ShieldCheck },
        { label: "Settings", icon: Settings },
    ];

    const handleSelect = (label: string) => {
        setCurrentNav(label);
        onNavSelect?.(label);
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
                    const isActive = currentNav === item.label;

                    return (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => handleSelect(item.label)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-primary-fixed text-primary font-bold"
                                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                            }`}
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
