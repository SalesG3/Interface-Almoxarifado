import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunsService {

  constructor() { }

  // Coleta o ID do registro na GRID:
  coletarId (event : MouseEvent){
    let rows = document.querySelectorAll('tbody tr');

    for(let i = 0; i < rows.length; i++){
      rows[i].classList.remove('focus');

      if((event.target as HTMLElement).parentElement == rows[i]){
        rows[i].classList.add('focus')
      }
    }
  }

  // Valida os Inputs Obrigatórios:
  validarInputs(inputs : Array<string>){
    let mensagem : string = "";

    for(let i = 0; i < inputs.length; i++){
      let input = (document.querySelector(inputs[i]) as HTMLInputElement)

      if(input.value == ""){
        input.classList.add('obrigatorio');
        mensagem = "Campos em vermelho são obrigatórios!";
      }
      else {
        input.classList.remove('obrigatorio');
      }
    };

    for(let i = 0; i < inputs.length; i++){
      let input = (document.querySelector(inputs[i]) as HTMLInputElement)

      if(input.classList.contains('focus')){
        return mensagem
      }
    }

    return true
  }

  // Mascará do campo Código:
  mascaraCodigo( input : HTMLInputElement ){
    let formatado : string = "";
    
    for( let i = 0; i < input.value.length; i++ ){

      if( i == input.maxLength && input.value[0] == '0' ){
        formatado = formatado.replace('0','');
        formatado += input.value[i];
      }

      else if ( i < input.maxLength ){
        formatado += input.value[i]
      }
    }

    input.value = formatado.padStart(input.maxLength,'0');
  }
}
