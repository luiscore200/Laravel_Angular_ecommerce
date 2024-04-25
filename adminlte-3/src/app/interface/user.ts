export interface User {
    id?:number;
    name?:string;
    role?:string;
    email?:string;
    password?:string;
    password_confirmation?: string;
    resetToken?:string;
}
