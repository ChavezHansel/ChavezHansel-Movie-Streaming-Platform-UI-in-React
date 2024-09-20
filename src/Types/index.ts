export type NavLink  = {
    name: string;
    path: string;
}
export type SignUpData = {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export type RegisterData = Omit<SignUpData, 'confirmPassword'>;
export type LoginData = Omit<RegisterData, 'name'>;