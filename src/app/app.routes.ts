import { Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { ResultadoBuscaComponent } from './resultado-busca/resultado-busca.component';

export const routes: Routes = [

  {path: '', component: TelaInicialComponent },
  {path: 'resultado-busca', component: ResultadoBuscaComponent},
  {
  path: "admin",
  children: [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "cadastro", loadComponent: () => import('./admin-cadastro/admin-cadastro.component').then(m => m.AdminCadastroComponent) },
    { path: "login", loadComponent: () => import('./admin-login/admin-login.component').then(m => m.AdminLoginComponent) },
    {
      path: "painel", 
  loadComponent: () => import('./painel/painel.component').then(m => m.PainelComponent) 
    }
   // { path: "dashboard", loadComponent: () => import('./admin/dashboard.component').then(m => m.DashboardComponent) }
  ]
}
];
