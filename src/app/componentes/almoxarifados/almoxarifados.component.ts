import { Component } from '@angular/core';

@Component({
  selector: 'app-almoxarifados',
  standalone: true,
  imports: [],
  templateUrl: './almoxarifados.component.html',
  styleUrl: './almoxarifados.component.css'
})
export class AlmoxarifadosComponent {

  mudarTela( modo : string){
    let crud = document.querySelector('.crud') as HTMLElement;
    let operadores = document.querySelector('.operadores') as HTMLElement;

    let grid = document.querySelector('.grid-componente') as HTMLElement;
    let dados = document.querySelector('.dados-componente') as HTMLElement;
    
    switch( modo ) {
      case 'Incluindo':
        crud.setAttribute('hidden','');
        operadores.style.display = 'inline-block'

        grid.setAttribute('hidden', '');
        dados.removeAttribute('hidden');
        break;

      default:
        crud.removeAttribute('hidden');
        operadores.style.display = 'none'

        grid.removeAttribute('hidden');
        dados.setAttribute('hidden','');
        break;
    }
  }
}