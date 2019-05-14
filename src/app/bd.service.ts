import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {
        console.log(publicacao)

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //Acompanhamento do progresso do upload
                        (snapshop: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshop
                            //console.log('Snapshot capturado no on()', snapshop)
                        },
                        (erro) => {
                            this.progresso.status = 'erro'
                            //console.log(erro)
                        },
                        () => {
                            //Finalização do processo
                            this.progresso.status = 'concluído'
                            //console.log('Upload completo')
                        }
                    ) //Escuta um determinado evento*/
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            //Consultar as publicações(database)
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value') //Faz uma única consulta quando o método for executado
                .then((snapshot: any) => {
                    //console.log(snapshot.val())

                    let publicacoes: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {
                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)

                    });
                    //console.log(publicacoes)
                    //resolve(publicacoes)
                    return publicacoes.reverse()
                })
                .then((publicacoes: any) => {

                    publicacoes.forEach((publicacao) => {
                        //Acessar os arquivos/imagens (storage)
                        firebase.storage().ref()
                            //Recupera o token da URL
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                publicacao.url_imagem = url

                                //Consultar o nome do usuário
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {

                                        publicacao.nome_usuario = snapshot.val().nome_usuario
                                    })
                            })
                    });

                    resolve(publicacoes)
                })
        })
    }
}