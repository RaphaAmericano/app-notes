export class Note {
    id:number;
    id_user:number;
    texto:string;
    data_criacao:Date;
    data_edicao:Date;
    constructor(){}

    public get getEdicaoTime():number {
        return this.data_edicao.getTime();
    }
}
