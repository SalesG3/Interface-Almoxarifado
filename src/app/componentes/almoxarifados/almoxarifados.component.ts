import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-almoxarifados',
  standalone: true,
  imports: [],
  templateUrl: './almoxarifados.component.html',
  styleUrl: './almoxarifados.component.css'
})
export class AlmoxarifadosComponent {
  mensagem : string = "";
  modo : string = "";
  id : string = "";
  tbody : any;

  constructor( private sanitizer : DomSanitizer){ }


  // CRUD: Novo Registro
  async novoRegistro( ) {

    try {
    
      let request = await fetch(environment.APIURL + '/novo/almoxarifados', {
        method: "POST",
        headers: {
          TOKEN: environment.TOKEN,
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          codigo: (document.querySelector('#codigo') as HTMLInputElement).value,
          almoxarifado: (document.querySelector('#almoxarifado') as HTMLInputElement).value,
          descricao: (document.querySelector('#descricao') as HTMLInputElement).value
        })
      }).then(response => {if(response.ok){return response.json()} else { console.log(response); return false}});

      if(request.sucesso){
        this.mudarTela('');
        console.log(request)
      }

      else if (request.codigo){
        this.mensagem = "Código já está sendo utilizado em outro registro!"
      }


    } catch (erro) {
      alert('Inconsistência Interna! Entrar em contato com Suporte.');
      console.error(erro);
    }
  }


  // CRUD: Consultar Registro
  async consultarRegistro(){

    

  }

  // CONSULTAS: Pesquisar
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
      }).then(response => {if(response.ok){return response.json()} else{ console.log(response); return false}});

      let html : string = "";
      for(let i = 0; i < request.length; i++){
        html += `<tr id="${request[i].id_almoxarifado}">
                    <td class="codigo">${request[i].codigo}</td>
                    <td class="almoxarifado">${request[i].almoxarifado}</td>
                  </tr>`
      }
      this.tbody = this.sanitizer.bypassSecurityTrustHtml(html);
      document.querySelector('tbody')?.addEventListener('click', this.idRegistro)

  
    } catch (erro) {
      alert('Inconsistência Interna! Entrar em contato com Suporte.');
      console.error(erro);
    }
  }
  

  // CONSULTAS: Código Automático:
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
      alert('Inconsistência Interna! Entrar em contato com Suporte.');
      console.error(erro);
    }
  }


  // OUTROS: Validação Inputs:
  validarInputs( modo : string){
    let inputs = ['#codigo', '#almoxarifado'];
    for(let i = 0; i < inputs.length; i++){
      if((document.querySelector(inputs[i]) as HTMLInputElement).value == ""){
        document.querySelector(inputs[i])?.classList.add('obrigatorio');
        this.mensagem = "Campos em vermelho são obrigatórios!"
      }

      else{
        document.querySelector(inputs[i])?.classList.remove('obrigatorio');
      }
    }

    for(let i = 0; i < inputs.length; i++){
      if(document.querySelector(inputs[i])?.classList.contains('obrigatorio'))
        { return false }
    }

    switch(modo){
      case 'Incluindo':
        this.novoRegistro();
        this.mudarTela('');
        break
      
      case 'Alterando':
        break
    }
      return this.mensagem = "";
  }

  // OUTROS: Mascara Código:
  mascaraCodigo( input : HTMLInputElement ){

    let formatado : string = "";
    for( let i = 0; i < input.value.length; i++ ){

      if( i == 2 && input.value[0] == '0' ){
        formatado = formatado.replace('0','');
        formatado += input.value[i];
      }

      else if ( i < 2 ){
        formatado += input.value[i]
      }
    }

    input.value = formatado.padStart(2,'0');
  }


  // OUTROS: Alternar entre telas:
  mudarTela( modo : string){
    let crud = document.querySelector('.crud') as HTMLElement;
    let operadores = document.querySelector('.operadores') as HTMLElement;

    let grid = document.querySelector('.grid-componente') as HTMLElement;
    let dados = document.querySelector('.dados-componente') as HTMLElement;
    
    switch( modo ) {
      case 'Incluindo':
        this.autoCodigo();
        this.modo = modo;

        crud.style.display = 'none'
        operadores.style.display = 'inline-block'

        grid.setAttribute('hidden', '');
        dados.removeAttribute('hidden');

        (document.querySelector('.fechar') as HTMLElement).style.display = 'none'
        break;

      default:
        let inputs = document.querySelectorAll(' .dados-componente input, textarea');
        for(let i = 0; i < inputs.length; i++){
          (inputs[i] as HTMLInputElement).value = "";
          (inputs[i] as HTMLInputElement).classList.remove('obrigatorio')
        }

        crud.style.display = 'inline-block'
        operadores.style.display = 'none'

        grid.removeAttribute('hidden');
        dados.setAttribute('hidden','');
        this.mensagem = "";
        break;
    }
  }

  
  // OUTROS: ID do Registro
  idRegistro(event : MouseEvent){
    let trs = document.querySelectorAll('tbody tr');

    for(let i = 0; i < trs.length; i++){
      (trs[i] as HTMLElement).classList.remove('focus');

      if(trs[i] == (event.target as HTMLElement).parentElement){
        trs[i].classList.add('focus');
        this.id = (trs[i] as HTMLElement).id;
      }
    }
    return this.id
    // AO CONSOLAR FORA NÃO TRAZ O VALOR QUE FOI ATRIBUIDO DENTRO DA FUNÇÃO;
    // MOTIVO PROVAVEL: ADDEVENTLINISTER;
  }
}