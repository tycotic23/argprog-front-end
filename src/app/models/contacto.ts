export class Contacto {
    redsocial:string;
    url: string;
    redsocialurl:string;
    texto:string;

    constructor(url:string,redsocial:string,redsocialurl:string,texto:string){
        this.url=url;
        this.redsocial=redsocial;
        this.redsocialurl=redsocialurl;
        this.texto=texto;
    }
}
