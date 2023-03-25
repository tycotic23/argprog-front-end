export class JwtDTO {
    token:string;
    type:string;
    nombreUsuario:string;
    authorities:string[];

    constructor(token:string, nombreUsuario:string,type:string,authorities:string[]){
        this.token=token;
        this.nombreUsuario=nombreUsuario;
        this.type=type;
        this.authorities=authorities;
    }
}
