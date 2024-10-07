import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchRespons } from '../interfaces/gifs.intefaces';

@Injectable({providedIn: 'root'})

export class GifsService {

  public gifList: Gif[] = [];

  //por que se hace privado?
  //Para realizar un get. esto quiere decir que si alguin
  //Hace una modificacion en el arreglo fuera del servicio.
  //Asi que hacemos una copia de nuestro arreglo, para hacer las modificaciones
  private _tagsHistory: string[] = [];

  private apikey: string = 'ZN35MStlZvG5Hi2glk5K9VG07n9jedRd';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  //copia del arreglo.
  //get se utiliza para hacer modificaciones de un objeto sin
  //alterar el real.
  //El cual tambien nos permite utilizar en el html
  get tagsHistory(): string[]{
    return [...this._tagsHistory];
  }

  //metodo organizar busqueda
  private organizeHistory(tag:string){
    tag = tag.toLowerCase(); //pasamos los tags a minuscula

    if(this._tagsHistory.includes(tag) ){ //si es el mismo tag
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag); //solo los que sean diferentes los va a dejar pasar
    }

    this._tagsHistory.unshift( tag ); //agrega el tag al principio
    this._tagsHistory = this._tagsHistory.splice(0,10); //solo agregara 10 tag
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    //JSON.strigify: nos ayuda a pasar un arreglo a un string.
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ) );
  }

  private loadLocalStorage(){
    if( !localStorage.getItem('history') ) return; //si no tengo data no hagas nada
    localStorage.getItem('history'); //obtenemos la informacion de local storage

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); // '!: siempre va a venir una data'

    if( this._tagsHistory.length === 0 ) return;
    this.searchTag(  this._tagsHistory[0] );
  }

  //metodo buscar
  searchTag( tag:string ):void{
    //si la palabra es igual a cero no hace nada
    if( tag.length === 0 ) return;
    this.organizeHistory(tag); //Metodo


    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchRespons>(`${this.serviceUrl}/search`,{ params })
    .subscribe((resp) => {
      this.gifList = resp.data;
      console.log({ gifs: this.gifList }); //console se obtiene de la api


    })

    //fetch('https://api.giphy.com/v1/gifs/search?api_key=ZN35MStlZvG5Hi2glk5K9VG07n9jedRd&q=valorant&limit=10')
    //.then(resp => resp.json() )
    //.then( data => console.log(data)
    //)

    console.log(this._tagsHistory); //console que se obtine por input;
  }

}
