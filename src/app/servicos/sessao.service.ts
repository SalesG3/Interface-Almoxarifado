import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  id_usuario : string = "";
  usuario : string = "";
  entidade : string = "Prefeitura Municipal de Bom Jesus da Lapa";
  versao : string = "v1.0.00"

  constructor() { }
}
