import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visível', style({
        opacity: 1
      }))
      //transition('escondido <=> visível', animate('1s ease-in')),  // Estado inicial => Estado final
      //transition('visível => escondido', animate('2s ease-in'))  // Estado inicial => Estado final
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'visível'

  constructor() { }

  ngOnInit() {
  }

  public toggleEstado(): void {
    this.estado = this.estado === 'visível' ? 'escondido' : 'visível'
  }

}
