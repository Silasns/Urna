import { Component, OnInit } from '@angular/core';
import { Opcoes } from 'models/opcoes.models';
import { Voto } from 'models/voto.models';
import { RelatorioService } from '../service/relatorio.service';
import { VotarService } from '../service/votar.service';
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})

//Componente mostra na tela o resultado da votação com gráficos;

export class RelatorioComponent implements OnInit {

  //tipo de eleicao
  tipo : string = ""

  //titulo da eleicao
  titulo : string = ""

  //array com quantidade de votos
  contagem :any [] = [];

  //opçoes da votação (candidatos/temas)
  opcoes : any[] = [];

  //votos pegos do bd
  votos : any [] = []

  constructor(
    private service: VotarService,
    private serviceRelatorio : RelatorioService
  ) { }

  ngOnInit(): void {
    this.pegaVotos()
    this.atualizaOpcao();
  }

  //faz a apuração dos votos e adiciona ao array contagem
  public geraGrafico(){
    for(let i = 0; i <this.opcoes.length; i++) {

      this.contagem.push({//primeiro zera todo o array
        "opcao" : this.opcoes[i].nome,
        "votos" : 0,
        "Media":0
      });
    }
    //soma votos a cada vetor
    if(this.votos.length>1){
      for(let i = 0; i < this.opcoes.length; i++) {
        for (let j = 0; j < this.votos.length; j++) {
          if (this.opcoes[i].value == this.votos[j][1]) {
            this.contagem[i].votos=this.contagem[i].votos+1;
          }
        }
      }


      //calcula a media/percentual dos votos totais
      for(let i = 0; i<this.contagem.length; i++){
        this.contagem[i].media = ((this.contagem[i].votos/this.votos.length)*100).toFixed(2);
      }
    }

  }

  //pega as opções da eleicao no bd e carrega
  public atualizaOpcao(){
    this.service.getAllOpcao().subscribe((opcoesBuscadas:Opcoes[]) =>{
      let teste = JSON.parse(JSON.stringify(opcoesBuscadas));
      this.opcoes = teste.opcoes
      this.titulo = teste.titulo
      this.tipo=teste.tipo
      this.geraGrafico();
      this.ordenaCandidatos();
    });
  }

  public pegaVotos(){
    this.serviceRelatorio.getAllVotos().subscribe((votosPegos:Voto[]) =>{
      let array : any [] = votosPegos;
      this.votos=array;
    });
  }

  //ordena em ordem decrescente;
  public ordenaCandidatos(){
    let x = this.contagem.sort((a, b) => (a.votos < b.votos ? 1 : -1));
  }
}

