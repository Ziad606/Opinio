import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98]",

    secondary:
        "bg-secondary-container text-on-secondary-container hover:bg-surface-container",

    ghost: "text-on-surface-variant hover:bg-surface-container",

    destructive: "bg-error text-on-error hover:opacity-90 active:scale-[0.98]",
};

export function Button({
    variant = "primary",
    className = "",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={[
                "inline-flex h-12 items-center justify-center gap-2",
                "rounded-full px-6",
                "font-sans text-base font-bold",
                "transition-all duration-150",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring",
                "focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                variantClasses[variant],
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </button>
    );
}
