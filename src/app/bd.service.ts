import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        console.log(publicacao)

        let nomeImagem = Date.now() //Instante de uploasd
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
            ) //Escuta um determinado evento
        /*firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push( { titulo: publicacao.titulo })*/
    }
}