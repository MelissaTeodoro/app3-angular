import { Usuario } from './acesso/usuario.model'
import * as firebase from 'firebase'

export class Autenticacao {

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        //console.log('Chegamos até o serviço ', usuario)
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                //Remover a senha do atributo senha do objeto usuário
                delete usuario.senha

                //Registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`) //btoa() retorna a string convertida na base 64
                    .set(usuario)

            })
            .catch((erro: Error) => console.log(erro))
    }

    public autenticar(email: string, senha: string): void {
        console.log('email: ', email)
        console.log('senha: ', senha)
        
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => console.log(resposta) )
            .catch((erro: Error) => console.log(erro) )
    }
}