export interface AuthResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
    token: string;
    expiresIn: number;
    refreshToken: string;
    refreshTokenExpiration: string;
}
