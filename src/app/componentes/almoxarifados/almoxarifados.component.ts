import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';
import { CRUDService } from '../../servicos/crud.service';
import { ComunsService } from '../../servicos/comuns.service';

@Component({
  selector: 'app-almoxarifados',
  standalone: true,
  imports: [],
  templateUrl: './almoxarifados.component.html',
  styleUrl: './almoxarifados.component.css'
})
export class AlmoxarifadosComponent {
  tabela : string = "almoxarifados"
  mensagem : string = "";
  modo : string = "";
  id : string = "";
  tbody : any;

  // Funções Comuns:
  mascaraCodigo : Function;
  
  constructor( private sanitizer : DomSanitizer, private crud : CRUDService, private comuns : ComunsService){
    this.mascaraCodigo = this.comuns.coletarId
  }
  
  // Pesquisar Registros:
  async pesquisarGRID ( ) {
    let data = {pesquisa: (document.querySelector('#pesquisa') as HTMLInputElement).value}
    let response = await this.crud.inputPesquisar(this.tabela, data);

    let html : string = "";
    for(let i = 0; i < response.length; i++){
      html += `<tr id="${response[i].id_almoxarifado}">
                <td class="codigo">${String(response[i].codigo).padStart(2,'0')}</td>
                <td class="almoxarifado">${response[i].almoxarifado}</td>
              </tr>`
    }

    this.tbody = this.sanitizer.bypassSecurityTrustHtml(html);
    (document.querySelector('tbody') as HTMLElement).addEventListener('click', this.comuns.coletarId);
  }
  
  // Salvar Novo/Alteração Registro:
  async salvarRegistro( ) {
    let data = {
      codigo: (document.querySelector('#codigo') as HTMLInputElement).value,
      almoxarifado: (document.querySelector('#almoxarifado') as HTMLInputElement).value,
      descricao: (document.querySelector('#descricao') as HTMLInputElement).value
    }

    let validacao = this.comuns.validarInputs(['#codigo','#almoxarifado']);

    if(validacao != true){this.mensagem = validacao; return } else { this.mensagem = ""}

    switch(this.modo){
      case 'Incluindo':
        if( await this.crud.novoRegistro(this.tabela, data) != false){
          this.mudarTela('');
          this.pesquisarGRID();
        }
        break;
      
      case 'Alterando':
        console.log('Método Alterando em Desenvolvimento.');
        break;
    }
  }

  // Consultar Registro
  async consultarRegistro(){
    if(!document.querySelector('.focus')){ return };

    this.id = (document.querySelector('.focus') as HTMLInputElement).id;
    let response = await this.crud.consultarRegistro(this.tabela, this.id);
    
    for(let i in response[0]){
      if(document.querySelector(`#${i}`)){
        (document.querySelector(`#${i}`) as HTMLInputElement).value = response[0][i];
      }
    }
    (document.querySelector('#codigo') as HTMLInputElement).value = String(response[0].codigo).padStart(2,'0');
  }

  // OUTROS: Alternar entre telas:
  mudarTela( modo : string){
    let inputs = document.querySelectorAll(' .dados-componente input, textarea, select');

    let crud = document.querySelector('.crud') as HTMLElement;
    let operadores = document.querySelector('.operadores') as HTMLElement;
    let grid = document.querySelector('.grid-componente') as HTMLElement;
    let dados = document.querySelector('.dados-componente') as HTMLElement;
    
    switch( modo ) {
      case 'Incluindo':
        this.crud.codigoAutomatico(this.tabela);
        this.modo = modo;

        crud.style.display = 'none'
        operadores.style.display = 'inline-block'

        grid.setAttribute('hidden', '');
        dados.removeAttribute('hidden');

        (document.querySelector('.fechar') as HTMLElement).style.display = 'none'
        break;
      
      case 'Alterando':
        this.consultarRegistro();
        crud.style.display = 'none'
        operadores.style.display = 'inline-block'

        grid.setAttribute('hidden', '');
        dados.removeAttribute('hidden');
        this.modo = modo
        break;

      case 'Consultando':
        this.consultarRegistro();
        for(let i = 0; i <  inputs.length; i++){
          inputs[i].setAttribute('disabled','');
        }

        crud.style.display = 'none'
        operadores.style.display = 'inline-block'

        grid.setAttribute('hidden', '');
        dados.removeAttribute('hidden');
        break;

      default:
        for(let i = 0; i < inputs.length; i++){
          (inputs[i] as HTMLInputElement).value = "";
          (inputs[i] as HTMLInputElement).classList.remove('obrigatorio');
          (inputs[i] as HTMLInputElement).removeAttribute('disabled');
        }

        crud.style.display = 'inline-block'
        operadores.style.display = 'none'

        grid.removeAttribute('hidden');
        dados.setAttribute('hidden','');
        this.mensagem = "";
        break;
    }
  }
}