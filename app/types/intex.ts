export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
}

export type Category = {
    id: string;
    name: string;
};