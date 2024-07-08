export class User {
    id = 0;
    created_at?: string;
    first_name?: string;
    last_name?: string;
    username?: string ;
    password?: string;
    email?: string;
    gender?: string;
    user_type?: string;
    address?: string;
    phone?: string;
    url?: string;
    latitude?: number; // Latitude as a floating-point number
    longitude?: number; // Longitude as a floating-point number
    favorites_recipes?: number[];
    response?: Response;

    constructor( username: string, password: string, email : string, 
        address : string ,latitude : number , longitude : number ){
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.favorites_recipes = [];
        this.first_name = '';
        this.last_name = '';
    }
}

  