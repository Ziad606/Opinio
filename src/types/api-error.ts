export interface ApiErrorItem {
    code: string;
    description: string;
    statusCode: number;
}

export interface ApiErrorResponse {
    type: string;
    title: string;
    status: number;
    errors: ApiErrorItem[];
}

export class ApiError extends Error {
    readonly status: number;
    readonly errors: ApiErrorItem[];
    readonly title: string;

    constructor(status: number, errors: ApiErrorItem[], title: string) {
        super(title);

        this.name = "ApiError";

        this.status = status;
        this.errors = errors;
        this.title = title;
    }

    get message(): string {
        return (
            this.errors[0]?.description ?? this.title ?? "Something went wrong"
        );
    }
}
