import { CadastroService } from './../service/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Usuario } from 'models/usuario.models';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  usuario: string = "";
  senha: string = ""
  confirmaSenha: string = ""
  alerta: string = ""
  alertaSenha: string = ""
  alertaUsuario: string = ""
  classeAlerta: string = ""
  alertaConfirmaSenha: string = ""

  tipoInput: string = "password";
  olho: string = "bi bi-eye";

  tipoInputConfirmaSenha: string = "password";
  olhoConfirmaSenha: string = "bi bi-eye";

  constructor(private service: CadastroService, private router: Router) { }


  public cadastrar() {

    if(this.senha == ""){
      this.classeAlerta = "fw-light fs-6 text-danger"
      this.alertaSenha = "Favor inserir uma senha"
      setTimeout(() => {
        this.alertaSenha = ""
      }, 2000);
    }if(this.confirmaSenha == ""){
      this.classeAlerta = "fw-light fs-6 text-danger"
      this.alertaConfirmaSenha = "Favor confirmar senha"
      setTimeout(() => {
        this.alertaConfirmaSenha = ""
      }, 2000);
    }if(this.usuario == ""){
      this.classeAlerta = "fw-light fs-6 text-danger"
      this.alertaUsuario = "Favor informa usuário"
      setTimeout(() => {
        this.alertaUsuario = ""
      }, 2000);
    }if (this.senha != this.confirmaSenha) {
      this.classeAlerta = "fw-light fs-6 text-danger"
      this.alertaSenha = "Senhas não coincidem"
      setTimeout(() => {
        this.alertaSenha = ""
      }, 2000);
      this.limparTela()

    } else {

      const usuario: Usuario = {
        usuario: this.usuario,
        senha: this.senha
      }

      this.service.cadastrarUsuario(usuario).subscribe((resultado) => {
        if(resultado.status == "401"){
          this.classeAlerta = "fw-light fs-6 text-danger"
          this.alertaUsuario = "Usuário já cadastrado"
          setTimeout(() => {
            this.alertaUsuario = ""
          }, 2000);
          this.limparTela()
        }else{
          this.classeAlerta = "fw-light fs-6 text-success"
          this.alertaUsuario = "Cadastro realizado com sucesso"
          setTimeout(() => {
            this.alerta = ""
            this.router.navigateByUrl("login")
          }, 2000);
          this.limparTela()

        }
      }, error => {
        console.log(error)
      });
    }


  }

  private limparTela() {
    this.usuario = "";
    this.senha = "";
    this.confirmaSenha = "";
  }

  public olhoSenha (event: MouseEvent){

    if(this.tipoInput=="text"){
     this.tipoInput = 'password'
     this.olho = "bi bi-eye"

    }else if(this.tipoInput=="password"){
     this.tipoInput="text"
     this.olho = "bi bi-eye-slash"
    }

 }

 public olhoConfirmarSenha (event: MouseEvent){

  if(this.tipoInputConfirmaSenha=="text"){
   this.tipoInputConfirmaSenha = 'password'
   this.olhoConfirmaSenha = "bi bi-eye"

  }else if(this.tipoInputConfirmaSenha=="password"){
   this.tipoInputConfirmaSenha="text"
   this.olhoConfirmaSenha = "bi bi-eye-slash"
  }
}

  ngOnInit(): void {
  }

}
