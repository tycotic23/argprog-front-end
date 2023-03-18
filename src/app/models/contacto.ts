export class Contacto {
    redsocial:string;
    url: string;
    logourl:string;
    texto:string;

    constructor(url:string,redsocial:string,logourl:string,texto:string){
        this.url=url;
        this.redsocial=redsocial;
        this.logourl=logourl;
        this.texto=texto;
    }
}
