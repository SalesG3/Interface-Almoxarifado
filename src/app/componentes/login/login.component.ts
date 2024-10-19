import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Md5 } from 'ts-md5/dist/cjs/md5';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mensagem : string = "";

  constructor ( private router : Router ){  }

  async login ( ) {
    this.mensagem = "";

    try {

      let request = await fetch(environment.APIURL + '/login', {
        method: "POST",
        headers:{
          TOKEN: environment.TOKEN,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          login: (document.querySelector('#usuario') as HTMLInputElement).value,
          senha: Md5.hashStr((document.querySelector('#senha') as HTMLInputElement).value)
        })
      }).then(response => {if(response.ok){return response.json()} else { console.error(response); return false}})

        if(request.sucesso){
          this.router.navigate(['/']);
          return
        }

        else if(request.erro){
          this.mensagem = "Usuário e Senha incompatíveis!"
          return
        }

        else {
          this.mensagem = "Inconsistência interna! Entrar em contato com Suporte!"
        }
    }

    catch (erro) {
      alert('Inconsistência Interna! Favor entrar em contato com Suporte.')
      console.error(erro);
    }
  }
}
