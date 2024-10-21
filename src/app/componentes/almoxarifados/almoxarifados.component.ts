import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-almoxarifados',
  standalone: true,
  imports: [],
  templateUrl: './almoxarifados.component.html',
  styleUrl: './almoxarifados.component.css'
})
export class AlmoxarifadosComponent {

  // CRUD:

  // Novo Registro:
  async novoRegistro( ) {

    try {
    
      let request = await fetch(environment.APIURL + '/novo/almoxarifados', {
        method: "POST",
        headers: {
          TOKEN: environment.TOKEN,
          "Content-Type":"applcation/json",
        },
        body: JSON.stringify({
          codigo: (document.querySelector('#codigo') as HTMLInputElement).value,
          almoxarifado: (document.querySelector('#almoxarifado') as HTMLInputElement).value,
          descricao: (document.querySelector('#descricao') as HTMLInputElement).value
        })
      }).then(response => {if(response.ok){return response.json()} else { console.log(response); return false}});

      if(request.sucesso){
        this.mudarTela('');
      }


    } catch (erro) {
      alert('Inconsistência Interna! Favor entrar em contato com Suporte.');
      console.error(erro);
    }
  }

  // OUTROS:

  // Pesquisa: REVISAR APÓS EXISTIR LANÇAMENTOS PARA ENCORPOAR O TBODY
  async pesquisar ( ) {

    try {
      let request = await fetch(environment.APIURL + '/pesquisa/almoxarifados', {
        method: "POST",
        headers: {
          TOKEN: environment.TOKEN,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          pesquisa: (document.querySelector('#pesquisa') as HTMLInputElement).value
        })
      }).then(response => {if(response.ok){return response.json()} else{ console.log(response); return false}})

        
  
    } catch (erro) {
      alert('Inconsistência Interna! Favor entrar em contato com Suporte.');
      console.error(erro);
    }
  }
  

  // Mascara Código:
  mascaraCodigo( input : HTMLInputElement){

    let formatado : string = "";
    for(let i = 0; i < input.value.length; i++){
      
    }
  }

  // Código Automático:
  async autoCodigo(){

    try {
      let request = await fetch(environment.APIURL + '/codigo/almoxarifados', {
        method: "GET",
        headers: {
          TOKEN: environment.TOKEN,
          "Content-Type":"application/json"
        }
      }).then(response => {if(response.ok){return response.json()} else { console.log(response); return false}});

      (document.querySelector('#codigo') as HTMLInputElement).value = String(request[0].codigo).padStart(2, '0');

    } catch(erro) {
      alert('Inconsistência Interna! Favor entrar em contato com Suporte.');
      console.error(erro);
    }

  }

  // Alternar entre telas:
  mudarTela( modo : string){
    let crud = document.querySelector('.crud') as HTMLElement;
    let operadores = document.querySelector('.operadores') as HTMLElement;

    let grid = document.querySelector('.grid-componente') as HTMLElement;
    let dados = document.querySelector('.dados-componente') as HTMLElement;
    
    switch( modo ) {
      case 'Incluindo':
        this.autoCodigo();
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