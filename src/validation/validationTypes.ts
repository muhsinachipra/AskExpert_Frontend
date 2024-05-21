export interface FormValues {
    name: string;
    email: string;
    mobile: string;
    password: string;
    cpassword: string
}

export interface Logins {
    email: string;
    password: string
}

export interface MyError {
    data?: {
        message?: string;
    };
    error?: string;
}