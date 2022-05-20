import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrnaComponent } from './urna/urna.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  {path: '',redirectTo : 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'urna',component: UrnaComponent},
  {path: 'relatorio',component: RelatorioComponent},
  {path: 'cadastro',component: CadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
