import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

export function Input({
    hasError = false,
    className = "",
    ...props
}: InputProps) {
    return (
        <input
            className={[
                "h-12 w-full rounded-lg border",
                "bg-surface px-4",
                "font-sans text-base text-on-surface",
                "placeholder:text-on-surface-variant",
                "transition-colors",
                "focus:border-primary",
                "focus:outline-none",
                "focus:ring-1 focus:ring-primary",
                "disabled:cursor-not-allowed disabled:opacity-50",
                hasError
                    ? "border-error focus:border-error focus:ring-error"
                    : "border-outline-variant",
                className,
            ].join(" ")}
            {...props}
        />
    );
}
