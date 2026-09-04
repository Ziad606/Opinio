import { z } from "zod";
import { patterns } from "../../../config/constants";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(patterns.atLeastOneLetter, "Password must contain at least one letter")
        .regex(patterns.atLeastOneNumber, "Password must contain at least one number")
        .regex(
            patterns.atLeastOneSpecialChar,
            "Password must contain at least one special character",
        ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
