export class Educacion {
    id?:number;
    logourl:string;
    institucion: string;
    titulo:string;
    fechaini:string;
    fechafin:string;

    constructor(logourl:string,fechaini:string,fechafin:string,institucion:string,titulo:string){
        this.institucion=institucion;
        this.logourl=logourl;
        this.titulo=titulo;
        this.fechaini=fechaini;
        this.fechafin=fechafin;
    }
}
