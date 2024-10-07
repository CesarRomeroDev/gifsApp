import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.intefaces';

@Component({
  selector: 'app-gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrl: './gifs-card.component.css'
})
export class GifsCardComponent implements OnInit{

  @Input() //recibimos data del padre, el padre es los servicios
  public gif!: Gif;  //Simpre voy a recibir un valor inicializando "!"

  ngOnInit(): void { // propiedad requerida de que siempre lo mandan
    if ( !this.gif ) throw new Error('Gif property is required'); //si esto es undefine si no viene gif
  }
}
