import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { authService } from "../api/auth";
import { useResendConfirmEmail } from "../hooks/useResendConfirmEmail";
import { ApiError } from "../../../types/api-error";
import { Button, Card, Input, Label } from "../../../components/ui";

const isDuplicatedConfirmError = (error: unknown): boolean => {
    if (error instanceof ApiError) {
        return error.errors.some(
            (e) =>
                e.code === "User.DuplicatedConfirm" ||
                e.code?.includes("DuplicatedConfirm"),
        );
    }
    if (axios.isAxiosError(error) && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (Array.isArray(errors)) {
            return errors.some(
                (e: { code?: string }) =>
                    e.code === "User.DuplicatedConfirm" ||
                    e.code?.includes("DuplicatedConfirm"),
            );
        }
    }
    return false;
};

export default function EmailConfirmation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const resend = useResendConfirmEmail();

    const [email, setEmail] = useState("");

    const userId = searchParams.get("userId") ?? "";
    const code = searchParams.get("code") ?? "";

    const { mutate, status } = useMutation({
        mutationFn: () => authService.confirmEmail(userId, code),
        onError: (error) => {
            if (isDuplicatedConfirmError(error)) {
                toast.info("Email is already confirmed. Please log in.");
                navigate("/auth/login", { replace: true });
            }
        },
    });

    useEffect(() => {
        if (userId && code) {
            mutate();
        }
    }, []);

    const isLoading = status === "idle" || status === "pending";
    const isSuccess = status === "success";
    const isError = status === "error" || !userId || !code;

    const handleResend = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            resend.mutate(email.trim());
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
            <div className="w-full max-w-md">
                <Card className="flex flex-col items-center gap-6 p-8 text-center">
                    <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
                        Opinio
                    </h1>

                    {isLoading && (
                        <p className="text-base text-on-surface-variant">
                            Confirming your email address...
                        </p>
                    )}

                    {isSuccess && (
                        <>
                            <p className="text-base text-on-surface-variant">
                                Your email has been confirmed. You can now sign
                                in.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/auth/login")}
                                className="font-semibold text-primary transition-colors hover:text-primary-container"
                            >
                                Go to Login
                            </button>
                        </>
                    )}

                    {isError && (
                        <div className="flex w-full flex-col gap-4 text-center">
                            <p className="text-base text-on-surface-variant">
                                This confirmation link is invalid or has
                                expired.
                            </p>

                            <form
                                onSubmit={handleResend}
                                className="flex flex-col gap-3 text-left"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="resend-email">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="resend-email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={resend.isPending}
                                >
                                    {resend.isPending
                                        ? "Sending..."
                                        : "Resend Confirmation Email"}
                                </Button>
                            </form>

                            <button
                                type="button"
                                onClick={() => navigate("/auth/login")}
                                className="text-sm font-semibold text-primary transition-colors hover:text-primary-container"
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </Card>

                <div className="mt-6 text-center text-sm text-outline">
                    Secure Email Confirmation
                </div>
            </div>
        </main>
    );
}
