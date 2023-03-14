export class Subfooterdato {
    id?:number;
    iconourl:string;
    url: string;
    texto:string;

    constructor(url:string,iconourl:string,texto:string){
        this.url=url;
        this.iconourl=iconourl;
        this.texto=texto;
    }
}
