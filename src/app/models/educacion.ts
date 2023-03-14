export class Educacion {
    id?:number;
    logourl:string;
    institucion: string;
    titulo:string;
    fechaini:string;
    fechafin:string;

    constructor(institucion:string,logourl:string,titulo:string,fechaini:string,fechafin:string){
        this.institucion=institucion;
        this.logourl=logourl;
        this.titulo=titulo;
        this.fechaini=fechaini;
        this.fechafin=fechafin;
    }
}
