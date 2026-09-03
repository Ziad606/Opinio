import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../../../types/api-error";
import { authService } from "../api/auth";

export function useResendConfirmEmail() {
    return useMutation({
        mutationFn: (email: string) => authService.resendConfirmEmail(email),

        onSuccess: () => {
            toast.success("Confirmation email sent. Please check your inbox.");
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
