import { Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { ResultadoBuscaComponent } from './resultado-busca/resultado-busca.component';

export const routes: Routes = [

  {path: '', component: TelaInicialComponent },
  {path: 'resultado-busca', component: ResultadoBuscaComponent}
];
