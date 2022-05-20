import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {

  private url: string = "http://localhost:3000/cadastro";

  constructor(private httpClient: HttpClient) { }

  public cadastrarUsuario( usuario: any ): Observable<any>{

      return this.httpClient.post<[]>(this.url,usuario)
  }
}
