import { Conocimiento } from "./conocimiento";

export class Categoria {

    id?:number;
    categoria: string;
    orden:number;
    conocimientos?:Conocimiento[]

    constructor(categoria:string,orden:number){
        this.categoria=categoria;
        this.orden=orden;
    }
}
