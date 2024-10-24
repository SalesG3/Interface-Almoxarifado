import { Component } from '@angular/core';
import { SessaoService } from '../../servicos/sessao.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  mensagem : string = "";

  entidade : string;
  versao : string;
  usuario : string;

  constructor ( private sessao : SessaoService ){
    this.entidade = this.sessao.entidade;
    this.versao = this.sessao.versao;
    this.usuario = this.sessao.usuario;
  }

  listDown ( button : HTMLButtonElement ) {

    function listUp(event : MouseEvent){
      if(event.target != button){
        div.style.display = "none"
        document.removeEventListener('mousedown', listUp)
      }
    }

    let div = document.querySelector(`#list-${button.value}`) as HTMLElement;

    div.style.left = button.offsetLeft + 'px';
    div.style.display = "block";

    document.addEventListener('click', listUp);
  }
}
