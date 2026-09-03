import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../../../types/api-error";
import { authService } from "../api/auth";
import { useAuthStore } from "../stores/auth.store";
import type { RegisterRequest } from "../types/register-request";

export function useRegister() {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (request: RegisterRequest) =>
            authService.register(request),

        onSuccess: (data) => {
            setAuth(data);

            toast.success("Account created successfully");
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
