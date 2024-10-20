import { Component } from '@angular/core';

@Component({
  selector: 'app-almoxarifados',
  standalone: true,
  imports: [],
  templateUrl: './almoxarifados.component.html',
  styleUrl: './almoxarifados.component.css'
})
export class AlmoxarifadosComponent {

  mudarTela(){
    let grid = document.querySelector('.grid-componente') as HTMLElement;
    let dados = document.querySelector('.dados-componente') as HTMLElement;

    grid.toggleAttribute('hidden')
    dados.toggleAttribute('hidden')
  }
}
