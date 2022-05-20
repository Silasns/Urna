import { Opcoes } from 'models/opcoes.models';
import { Component, OnInit } from '@angular/core';
import { VotarService } from '../service/votar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-urna',
  templateUrl: './urna.component.html',
  styleUrls: ['./urna.component.scss']
})

//Tela de votação

export class UrnaComponent implements OnInit {

  opcoes : any [] = [];
  usuario: string = "";
  tipo: string = "";
  titulo: string = "";
  voto: number = 0;
  data: string = "";
  selectedOption: number =0;
  confirmacao : string = ""

  constructor(private service: VotarService, private router: Router) { }

  public votar(){
    const voto = {
      usuario: this.usuario,
      voto: this.voto,
    }
    this.service.votar(voto).subscribe((resultado)=>{
      console.log(resultado)
    },error => {
      console.error(error)
    })
  }


  ngOnInit(): void {

    this.service.buscaTipoEleicao().subscribe((resultado)=>{
      if(resultado == "na"){
        this.verificaUser();
      }
    })
      this.service.getAllOpcao().subscribe((opcoesBuscadas:Opcoes[]) =>{
        let string = JSON.stringify(opcoesBuscadas)
        let teste = JSON.parse(string);
        this.titulo = teste.titulo
        this.tipo=teste.tipo
        this.opcoes = teste.opcoes
      }
  )
  }

  //retorna ao login
  public telaRedirect(){
   this.confirmacao="Voto Confirmado"

   setTimeout(() => {
    this.router.navigateByUrl("login");
   },200)

  }

  //verifica se o usuario é cadastrado
  public verificaUser(){

    let tokenUsuario :any = window.localStorage.getItem("token");

    this.service.verificaUser(tokenUsuario).subscribe((resultado)=>{
      console.log(resultado)
      this.usuario = JSON.stringify(window.localStorage.getItem("user"))
    },error => {
      this.router.navigateByUrl("login")
      console.error(error)
    })

  }

}
