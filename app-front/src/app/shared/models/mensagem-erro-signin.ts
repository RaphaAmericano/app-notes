import { MensagemErro } from './mensagem-erro';

export class MensagemErroSignin extends MensagemErro {
    
    public nome:string;
    public passwordRepeat:string;
    constructor(email:string, password:string, nome:string, passwordRepeat:string)
    {
        super(email, password);
        this.nome = nome;
        this.passwordRepeat = passwordRepeat;
    }
}
