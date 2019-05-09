import { Usuario } from './acesso/usuario.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class Autenticacao {

    public token_id: string

    constructor(private router: Router) { }
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
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/home'])
                    })
            })
            .catch((erro: Error) => console.log(erro))
    }

    public autenticado(): boolean {

        return this.token_id !== undefined
    }
}