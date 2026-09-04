export const routes = {
    home: "/home",
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        emailConfirmation: "/auth/emailConfirmation",
    },
} as const;

export const patterns = {
    atLeastOneLetter: /[A-Za-z]/,
    atLeastOneNumber: /\d/,
    atLeastOneSpecialChar: /[^A-Za-z0-9]/,
} as const;
