import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opcoes } from 'models/opcoes.models';
import { Voto } from 'models/voto.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class VotarService {
  private _listaOpcoes: any[] = [];
  private url : string = "http://localhost:3000/opcoes"
  private urlValidacao : string = "http://localhost:3000/urna"
  private urlBuscaTipoEleicao: string = "http://localhost:3000/tipoeleicao"


  constructor(private httpClient: HttpClient) { }



  private urlVotar: string = "http://localhost:3000/votos";


  public votar( voto: Voto ): Observable<Voto>{
      this.carimbar(voto)
      return this.httpClient.post<Voto>(this.urlVotar,voto)
  }

  private carimbar(voto: any){
    voto.data = new Date();
  }


  public getAllOpcao():Observable<Opcoes[]> {
    return this.httpClient.get<Opcoes[]>(this.url);
  }

  public get listaOpcoes(): any[] {
    return this._listaOpcoes;
  }
  public set listaOpcoes(value: any[]) {
    this._listaOpcoes = value;
  }


  public verificaUser( token: any ): Observable<any>{
    const options = {
      token:token
    }
    return this.httpClient.post<any>(this.urlValidacao,options)

  }

  public buscaTipoEleicao(): Observable<any>{

    return this.httpClient.get<[]>(this.urlBuscaTipoEleicao)
  }

}
