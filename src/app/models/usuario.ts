export class Usuario {
    textusuario:string;
    contraseña: string;
    permisos:number;

    constructor(contraseña:string,textusuario:string,permisos:number){
        this.contraseña=contraseña;
        this.textusuario=textusuario;
        this.permisos=permisos;
    }
}
