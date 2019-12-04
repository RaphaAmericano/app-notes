export class User {
    id:number;
    nome:string;
    email:string;
    senha:string;

    constructor();
    constructor(id?, senha?){
        this.id = id;
        this.senha = senha;
    };

    setId(id:number){
        this.id = id;
    }
    setPassword(password:string){
        this.senha = password;
    }
}
