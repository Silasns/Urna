import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voto } from 'models/voto.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RelatorioService {
  private url : string = "http://localhost:3000/votos"

  constructor(private httpClient: HttpClient) { }

  public getAllVotos():Observable<Voto[]> {
    return this.httpClient.get<Voto[]>(this.url);
  }
}
