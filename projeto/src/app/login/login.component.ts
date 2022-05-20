import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private router: Router) { }
  //variaveis do front
  usuario: string = "";
  senha: string = "";
  tipoInput: string = "password";
  olho: string = "bi bi-eye";



  //alertas
  alertaUsuario: string = "";
  alertaSenha: string = "";
  desabilita: boolean = false

  public logar(){

    //If verifica se usuario esta vazio
    if(this.usuario == ""){
      setTimeout(() => {
        this.limparTela()
      }, 2000);
      this.alertaUsuario = "Informe um usuario";

    //If verifica se senha esta vazio
    }else if(this.senha == ""){
      setTimeout(() => {
        this.limparTela()
      }, 2000);
      this.alertaSenha = "Informe uma senha";
    }else {
      const usuario = {
        usuario: this.usuario,
        senha: this.senha
      }

      this.service.validarLogin(usuario).subscribe((resultado)=> {
        //Enviando token de verificação para o localStorage
        localStorage.removeItem("token")
        localStorage.setItem("token", resultado.token)

        localStorage.removeItem("user")
        localStorage.setItem("user", resultado.retornoUsuario)

        this.router.navigateByUrl("urna")
      }, erro => {
        console.log(erro.status);
        if (erro) {
          setTimeout(() => {
            this.limparTela()
          }, 2000);
          this.alertaSenha = "Usuário ou senha invalidos"
        }
      })
   }
  }

  public confereUsuario(usuario: string){
    const usuarioIformado = {
      usuario:usuario
    }
    this.service.conferirUsuarioVotou(usuarioIformado).subscribe((resultado)=>{

      if(resultado.mensagem == "Usuario ja votou"){
        this.alertaUsuario = "Usuario já votou"
        this.desabilita = true
      }else{
        this.desabilita = false
        this.alertaUsuario = ""
      }

    })
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

  //Função de limpar a tela
  private limparTela() {
    this.usuario = "";
    this.senha = "";
    this.alertaSenha = "";
    this.alertaUsuario = "";
  }
  ngOnInit(): void {
    this.service.buscaTipoEleicao().subscribe((resultado)=>{
      if(resultado == "a"){
        this.router.navigateByUrl("urna")
      }
    })
  }
}
