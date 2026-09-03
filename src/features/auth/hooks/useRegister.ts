import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../../../types/api-error";
import { authService } from "../api/auth";
import type { RegisterRequest } from "../types/register-request";

export function useRegister() {
    return useMutation({
        mutationFn: (request: RegisterRequest) =>
            authService.register(request),

        onError: (error) => {
            if (error instanceof ApiError) {
                toast.error(error.message);
                return;
            }

            toast.error("Something went wrong. Please try again.");
        },
    });
}
