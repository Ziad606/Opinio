import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../hooks/useLogin";
import { useResendConfirmEmail } from "../hooks/useResendConfirmEmail";
import type { LoginFormValues } from "../types/LoginFormValues";
import type { LoginLocationState } from "../types/LoginLocationState";
import { ApiError } from "../../../types/api-error";

import { Button, Card, Input, Label } from "../../../components/ui";
import { loginSchema } from "../types/loginSchema";
import { routes } from "../../../config/constants";

export default function Login() {
    const login = useLogin();
    const resend = useResendConfirmEmail();
    const navigate = useNavigate();
    const location = useLocation();

    const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(
        null,
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormValues) => {
        setUnconfirmedEmail(null);

        login.mutate(data, {
            onSuccess: () => {
                const state = location.state as LoginLocationState | null;

                const from = state?.from ?? {
                    pathname: routes.home,
                };

                navigate(from, {
                    replace: true,
                });
            },
            onError: (error) => {
                if (
                    error instanceof ApiError &&
                    error.errors.some(
                        (e) => e.code === "User.EmailNotConfirmed",
                    )
                ) {
                    setUnconfirmedEmail(data.email);
                }
            },
        });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
            <div className="w-full max-w-md">
                <Card className="flex flex-col gap-6 p-8">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
                            Opinio
                        </h1>

                        <p className="text-base text-on-surface-variant">
                            Sign in to manage your polls and analytics.
                        </p>
                    </div>

                    {unconfirmedEmail && (
                        <div className="flex flex-col items-center gap-2 rounded-lg bg-error-container p-4 text-center">
                            <p className="text-sm text-error">
                                Your email address is not confirmed yet.
                            </p>
                            <button
                                type="button"
                                onClick={() => resend.mutate(unconfirmedEmail)}
                                disabled={resend.isPending}
                                className="text-sm font-semibold text-primary transition-colors hover:text-primary-container disabled:opacity-50"
                            >
                                {resend.isPending
                                    ? "Sending..."
                                    : "Resend confirmation email"}
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5"
                    >
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email" required>
                                Email Address
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                hasError={!!errors.email}
                                {...register("email")}
                            />

                            {errors.email && (
                                <p className="text-sm text-error">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" required>
                                    Password
                                </Label>

                                <button
                                    type="button"
                                    className="text-sm font-semibold text-primary transition-colors hover:text-primary-container"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                hasError={!!errors.password}
                                {...register("password")}
                            />

                            {errors.password && (
                                <p className="text-sm text-error">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                className="h-4 w-4 cursor-pointer rounded border-outline-variant text-primary focus:ring-primary"
                            />

                            <span className="text-sm text-on-surface-variant">
                                Remember me on this device
                            </span>
                        </label>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="mt-2 w-full"
                            disabled={login.isPending}
                        >
                            {login.isPending ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="border-t border-outline-variant pt-6 text-center">
                        <p className="text-sm text-on-surface-variant">
                            Don't have an account?
                            <button
                                type="button"
                                onClick={() => navigate(routes.auth.register)}
                                className="ml-1 font-semibold text-primary transition-colors hover:text-primary-container"
                            >
                                Register here
                            </button>
                        </p>
                    </div>
                </Card>

                {/* Security message */}
                <div className="mt-6 text-center text-sm text-outline">
                    Secure Login Portal
                </div>
            </div>
        </main>
    );
}
