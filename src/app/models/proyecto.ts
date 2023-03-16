export class Proyecto {
    id?:number;
    pictureurl:string;
    titulo: string;
    descripcion:string;
    botonver:boolean;
    botonurl:string;

    constructor(pictureurl:string,titulo:string,descripcion:string,botonver:boolean,botonurl:string){
        this.titulo=titulo;
        this.pictureurl=pictureurl;
        this.descripcion=descripcion;
        this.botonver=botonver;
        this.botonurl=botonurl;
    }
}
