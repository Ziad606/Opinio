import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ApiError } from "../../../types/api-error";
import { authService } from "../api/auth";
import { routes } from "../../../config/constants";

export function useConfirmEmail(userId: string, code: string) {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: () => authService.confirmEmail(userId, code),

        onError: (error) => {
            if (
                error instanceof ApiError &&
                error.errors.some(
                    (e) =>
                        e.code === "User.DuplicatedConfirm" ||
                        e.code?.includes("DuplicatedConfirm"),
                )
            ) {
                toast.info("Email is already confirmed. Please log in.");
                navigate(routes.auth.login, { replace: true });
            }
        },
    });

    useEffect(() => {
        if (userId && code) {
            mutation.mutate();
        }
    }, []);

    return mutation;
}
