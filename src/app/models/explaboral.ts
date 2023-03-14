export class Explaboral {
    id?:number;
    logourl:string;
    puesto: string;
    referencias:string;
    empresa:string;
    descripcion:string;
    fechaini:string;
    fechafin:string;

    constructor(puesto:string,logourl:string,referencias:string,fechaini:string,fechafin:string,empresa:string,descripcion:string){
        this.puesto=puesto;
        this.logourl=logourl;
        this.referencias=referencias;
        this.fechaini=fechaini;
        this.fechafin=fechafin;
        this.empresa=empresa;
        this.descripcion=descripcion;
    }
}
