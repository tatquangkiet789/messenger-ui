export type Login = {
    username: string;
    password: string;
};

export type LoginResponse = {
    statusCode: number;
    accessToken: string;
};

export interface IRegister {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    avatar: File;
}

export interface IUpdatePassword {
    formData: FormData;
    accessToken: string;
}

export type Auth = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    userRoleName: number;
    avatar: string;
    isVerified: boolean;
};

export interface IAuth {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    userRoleId: number;
    avatar: string;
    accessToken: string;
    tick: boolean;
}

export const isInstanceOfIAuth = (object: any): object is IAuth => {
    return (
        'id' in object &&
        'firstName' in object &&
        'lastName' in object &&
        'username' in object &&
        'email' in object &&
        'userRoleId' in object &&
        'avatar' in object &&
        'tick' in object
    );
};
