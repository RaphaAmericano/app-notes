export class MensagemErro {
    public email:string;
    public password:string;
    public unknown:string;
    constructor(email, password?){
        this.email = email;
        this.password = password;
    }
    
}
