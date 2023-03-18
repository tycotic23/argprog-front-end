import { Categoria } from "./categoria";

export class Conocimiento {

    id?:number;
    nombre:string;
    logourl: string;
    categoria: Categoria;

    constructor(logourl:string,nombre:string,categoria:Categoria){
        this.logourl=logourl;
        this.nombre=nombre;
        this.categoria=categoria;
    }
}
