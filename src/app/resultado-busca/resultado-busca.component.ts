// src/app/components/resultado-busca/resultado-busca.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {MusicaService } from '../service/musica-search.service';
import { MusicaSearch } from '../models/musica-search.model';

@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado-busca.component.html',
  styleUrls: ['./resultado-busca.component.css']
})
export class ResultadoBuscaComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private buscaService = inject(MusicaService);

  musicas: MusicaSearch[] = [];
  termoBusca: string = '';
  isLoading: boolean = false;
  nenhumResultado: boolean = false;
  erroCarregamento: boolean = false;

  ngOnInit(): void {
    // Captura o termo de busca da URL
    this.route.queryParams.subscribe(params => {
      this.termoBusca = params['termo'] || '';
      
      if (this.termoBusca) {
        this.realizarBusca();
      } else {
        // Se não tem termo, volta para home
        this.voltarParaHome();
      }
    });
  }

  realizarBusca(): void {
    this.isLoading = true;
    this.nenhumResultado = false;
    this.erroCarregamento = false;

    this.buscaService.buscar(this.termoBusca).subscribe({
      next: (resultado) => {
        this.musicas = resultado;
        this.isLoading = false;

        // Verifica se encontrou resultados
        if (this.musicas.length === 0) {
          this.nenhumResultado = true;
          // Registra busca sem resultado
          this.buscaService.registrarBusca(this.termoBusca, false);
        } else {
          // Registra busca com resultado
          this.buscaService.registrarBusca(this.termoBusca, true, this.musicas[0].id_musica);
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar músicas:', erro);
        this.isLoading = false;
        this.erroCarregamento = true;
      }
    });
  }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }

  novaBusca(): void {
    this.router.navigate(['/']);
  }

  copiarCodigo(codigo: string, event: Event): void {
    event.stopPropagation();
    
    // Copia o código para a área de transferência
    navigator.clipboard.writeText(codigo).then(() => {
      // Aqui você pode adicionar um feedback visual (toast/snackbar)
      console.log('Código copiado:', codigo);
      
      // Adiciona classe temporária para feedback visual
      const botao = event.target as HTMLElement;
      botao.classList.add('copiado');
      setTimeout(() => {
        botao.classList.remove('copiado');
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar código:', err);
    });
  }

  destacarTermo(texto: string): string {
    if (!this.termoBusca || !texto) return texto;
    
    const regex = new RegExp(`(${this.termoBusca})`, 'gi');
    return texto.replace(regex, '<mark>$1</mark>');
  }
}