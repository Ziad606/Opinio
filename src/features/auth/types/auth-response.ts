export interface AuthResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    expiresIn: number;
    refreshToken: string;
    refreshTokenExpiration: string;
}
