import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Autenticacao } from './autenticacao.service';

@Injectable() //Disponível para receber a injeção de outros serviços
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacao: Autenticacao) { }
    
    canActivate(): boolean {
        return this.autenticacao.autenticado()
    }
}