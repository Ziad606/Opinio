import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Settings, LogOut, LogIn } from "lucide-react";
import { useAuthStore } from "../../features/auth/stores/auth.store";
import { useLogout } from "../../features/auth/hooks/useLogout";
import { Button } from "../ui/Button";
import { routes } from "../../config/constants";

interface HeaderProps {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

export function Header({ activeTab = "Polls", onTabChange }: HeaderProps) {
    const user = useAuthStore((state) => state.user);
    const logoutMutation = useLogout();
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(activeTab);

    const navItems = ["Polls", "Results", "Users", "Roles"];

    const handleTabClick = (tab: string) => {
        setCurrentTab(tab);
        onTabChange?.(tab);
    };

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const handleLogin = () => {
        navigate(routes.auth.login);
    };

    const userFullName = user ? `${user.firstName} ${user.lastName}`.trim() : "";
    const userInitials = user
        ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
        : "U";

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-surface px-6">
            <div className="flex items-center gap-8">
                <Link to={routes.home} className="font-display text-2xl font-bold tracking-tight text-primary">
                    Opinio
                </Link>

                <nav className="flex items-center gap-1">
                    {navItems.map((tab) => {
                        const isActive = currentTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => handleTabClick(tab)}
                                className={`relative px-4 py-2 font-sans text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "text-primary border-b-2 border-primary"
                                        : "text-on-surface-variant hover:text-on-surface"
                                }`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                >
                    <Bell className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    aria-label="Settings"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                >
                    <Settings className="h-5 w-5" />
                </button>

                {user ? (
                    <div className="flex items-center gap-3 border-l border-border pl-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-fixed text-primary font-bold text-sm">
                            {userInitials}
                        </div>

                        <span className="font-sans text-sm font-medium text-on-surface">
                            {userFullName}
                        </span>

                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="!h-9 !px-3 text-xs gap-1.5 text-error hover:bg-error-container hover:text-on-error-container"
                            disabled={logoutMutation.isPending}
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button variant="primary" onClick={handleLogin} className="!h-9 !px-4 text-xs gap-1.5">
                        <LogIn className="h-4 w-4" />
                        Login
                    </Button>
                )}
            </div>
        </header>
    );
}
