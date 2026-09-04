import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "../hooks/useRegister";
import { registerSchema } from "../types/registerSchema";
import type { RegisterFormValues } from "../types/registerSchema";

import { Button, Card, Input, Label } from "../../../components/ui";
import { routes } from "../../../config/constants";

export default function Register() {
    const register_ = useRegister();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormValues) => {
        register_.mutate(data);
    };

    if (register_.isSuccess) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
                <div className="w-full max-w-md">
                    <Card className="flex flex-col items-center gap-6 p-8 text-center">
                        <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
                            Opinio
                        </h1>

                        <div className="flex flex-col items-center gap-3">
                            <p className="font-sans text-base font-semibold text-on-surface">
                                Check your email
                            </p>
                            <p className="font-sans text-sm text-on-surface-variant">
                                We sent a confirmation link to your email address. Please check your inbox and click the link to activate your account.
                            </p>
                        </div>

                        <div className="w-full border-t border-outline-variant pt-4">
                            <p className="text-sm text-on-surface-variant">
                                Already confirmed?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate(routes.auth.login)}
                                    className="font-semibold text-primary transition-colors hover:text-primary-container"
                                >
                                    Sign in here
                                </button>
                            </p>
                        </div>
                    </Card>
                </div>
            </main>
        );
    }

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
                            Create your account to get started.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5"
                    >
                        {/* First & Last Name */}
                        <div className="flex gap-4">
                            <div className="flex flex-1 flex-col gap-1.5">
                                <Label htmlFor="firstName" required>
                                    First Name
                                </Label>

                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    hasError={!!errors.firstName}
                                    {...register("firstName")}
                                />

                                {errors.firstName && (
                                    <p className="text-sm text-error">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col gap-1.5">
                                <Label htmlFor="lastName" required>
                                    Last Name
                                </Label>

                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    hasError={!!errors.lastName}
                                    {...register("lastName")}
                                />

                                {errors.lastName && (
                                    <p className="text-sm text-error">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

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
                            <Label htmlFor="password" required>
                                Password
                            </Label>

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

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="mt-2 w-full"
                            disabled={register_.isPending}
                        >
                            {register_.isPending
                                ? "Creating account..."
                                : "Create Account"}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="border-t border-outline-variant pt-6 text-center">
                        <p className="text-sm text-on-surface-variant">
                            Already have an account?
                            <button
                                type="button"
                                onClick={() => navigate("/auth/login")}
                                className="ml-1 font-semibold text-primary transition-colors hover:text-primary-container"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </Card>

                {/* Security message */}
                <div className="mt-6 text-center text-sm text-outline">
                    Secure Registration Portal
                </div>
            </div>
        </main>
    );
}
