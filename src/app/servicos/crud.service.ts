import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  headers = { TOKEN: environment.TOKEN, "Content-Type":"application/json" };

  constructor() { }

  // Pesquisa GRID:
  async inputPesquisar (tabela : string, data : object){

    try {

      let request = await fetch(environment.APIURL + `/pesquisa/${tabela}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data)
      });

      if(!request.ok){ console.error(request); return false}
      let response = await request.json();

      return response
    }

    catch(err){
      alert('Inconsistência Interna! Entrar em contato com Suporte.');
      console.error(err); return false
    }
  }

  // Código Automático:
  async codigoAutomatico(tabela:string){
    let input = document.querySelector('#codigo') as HTMLInputElement;
    
    try {

      let request = await fetch(environment.APIURL + `/codigo/${tabela}`, {
        method: "GET",
        headers: this.headers,
      });

      if(!request.ok){ console.error(request); return false}
      let response = await request.json();

      input.value = String(response[0].codigo).padStart(input.maxLength, '0')
      return true
    }

    catch(err){
      alert('Inconsistência Interna! Entrar em contato com Suporte.');
      console.error(err); return false
    }
  }

  // Salvar Registro:
  async novoRegistro (tabela : string, data : object){

    try {
      
      let request = await fetch(environment.APIURL + `/novo/${tabela}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data)
      });

      if(!request.ok){console.error(request); return false}
      let response = await request.json();

      return response
    }
    
    catch(err){
      alert('Inconsistência Interna! Entrar em contato com Suporte.');
      console.error(err); return false
    }
  }

  // Consultar Registro:
  async consultarRegistro(tabela : string, data : string){

    try {

      let request = await fetch(environment.APIURL + `/consulta/${tabela}/${data}`, {
        method: "GET",
        headers: this.headers,
      });

      if(!request.ok){ console.error(request); return false };
      let response = await request.json();

      return response
    }

    catch(err){
      alert('Inconsistência Interna! Entrar em contato com Suporte.');
      console.error(err); return false
    }
  }
}
