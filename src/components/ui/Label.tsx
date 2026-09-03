import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export function Label({
    required = false,
    className = "",
    children,
    ...props
}: LabelProps) {
    return (
        <label
            className={[
                "font-sans text-sm font-semibold text-on-surface",
                className,
            ].join(" ")}
            {...props}
        >
            {children}

            {required && (
                <span className="ml-1 text-error" aria-hidden="true">
                    *
                </span>
            )}
        </label>
    );
}
