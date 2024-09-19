import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <!--Keyup: cuando da enter y suelta la tecla y va agregando
  letra por letra-->
<!--Keyup.enter: agrega la palabra completa-->
  <h5>Buscar</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `
})

export class SearchBoxComponent {

  //@ViewChild: Nos sirve para tomar una referencia local, solo toma un elemento
  //@ViewChildren: es un arreglo, toma varios elementos.
  @ViewChild('txtTagInput') //toma la referencia del html
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private gifsService: GifsService
  ) { }

  searchTag( ){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = ''; //al dar clic deja la caja de texto vacia

  }
}
