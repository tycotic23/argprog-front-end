export class Subfooterdato {
    id?:number;
    iconourl:string;
    url: string;
    texto:string;

    constructor(iconourl:string,url:string,texto:string){
        this.url=url;
        this.iconourl=iconourl;
        this.texto=texto;
    }
}
