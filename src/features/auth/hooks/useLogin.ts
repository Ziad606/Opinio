import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../../../types/api-error";
import { authService } from "../api/auth";
import { useAuthStore } from "../stores/auth.store";
import type { LoginRequest } from "../types/login-request";

export function useLogin() {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (request: LoginRequest) => authService.login(request),

        onSuccess: (data) => {
            setAuth(data);

            toast.success("Logged in successfully");
        },

        onError: (error) => {
            if (error instanceof ApiError) {
                toast.error(error.message);
                return;
            }

            toast.error("Something went wrong. Please try again.");
        },
    });
}
