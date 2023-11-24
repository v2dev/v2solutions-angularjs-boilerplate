export interface RegisterUser {
    id: string;
    fullName: string;
    email: string;
    country: string,
    password: string
}

export interface LoginUser {
    email: string;
    password: string
}
