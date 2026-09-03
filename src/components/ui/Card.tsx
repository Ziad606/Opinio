import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
    return (
        <div
            className={[
                "rounded-xl border",
                "border-outline-variant",
                "bg-surface-container-lowest",
                "shadow-sm",
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}
