import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:3000/login"
  private urlConferirVotou: string = "http://localhost:3000/conferir"
  private urlBuscaTipoEleicao: string = "http://localhost:3000/tipoeleicao"

  constructor(private httpClient: HttpClient) { }

  public validarLogin(usuario: any): Observable<any> {

    return this.httpClient.post<[]>(this.url, usuario)
  }

  public conferirUsuarioVotou(usuario: any): Observable<any>{

    return this.httpClient.post<[]>(this.urlConferirVotou,usuario)

  }
  public buscaTipoEleicao(): Observable<any>{

    return this.httpClient.get<[]>(this.urlBuscaTipoEleicao)
  }




}
