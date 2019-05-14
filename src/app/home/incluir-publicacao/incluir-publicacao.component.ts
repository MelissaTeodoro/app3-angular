import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase';
import { Progresso } from '../../progresso.service';
import { Observable, Subject } from 'rxjs-compat';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email: string
  private imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(private bd: Bd, private progresso: Progresso) { }

  ngOnInit() {
    //Evento que dispara as mudanças quando o usuário está logado
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload = Observable.interval(1500)
    let continua = new Subject()

    continua.next()

    acompanhamentoUpload
      .takeUntil(continua) //Enquanto
      .subscribe(() => {
        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)
        //Interromper o andamento quando estiver concluído
        if (this.progresso.status === 'concluído') {
          this.progressoPublicacao = 'concluído'
          //Emitir um evento do componente parent (home)
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files //Converter os dados para HTMLInputElement
  }


}