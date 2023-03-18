export class Textomain {
    id?:number;
    nombre:string;
    texto: string;
    fotourl:string;
    ubicacion:string;

    constructor(nombre:string,texto:string,fotourl:string,ubicacion:string){
        this.texto=texto;
        this.nombre=nombre;
        this.fotourl=fotourl;
        this.ubicacion=ubicacion;
    }
}
