import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public mensagem_erro_cadastro: string = ''

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'nome_completo': new FormControl(null, [Validators.required]),
    'nome_usuario': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void {

    if (this.formulario.status === 'INVALID') {

      this.formulario.get('email').markAsTouched()
      this.formulario.get('nome_completo').markAsTouched()
      this.formulario.get('nome_usuario').markAsTouched()
      this.formulario.get('senha').markAsTouched()

    } else {
      let usuario: Usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nome_completo,
        this.formulario.value.nome_usuario,
        this.formulario.value.senha
      )

      this.autenticacao.cadastrarUsuario(usuario)
        .then(() => {
          if (this.autenticacao.mensagem_erro_cadastro.length > 0) {
            this.mensagem_erro_cadastro = this.autenticacao.mensagem_erro_cadastro
            this.autenticacao.mensagem_erro_cadastro = ''
          } else {
            this.exibirPainelLogin()
          }
        })
    }
  }

}
