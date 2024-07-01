export class LoginResponse {
    password?: string;
    email?: string;

    constructor( email: string, password: string){
        this.email = email;
        this.password = password;
    }
}