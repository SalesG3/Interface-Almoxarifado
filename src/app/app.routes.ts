import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { IndexComponent } from './componentes/index/index.component';
import { AlmoxarifadosComponent } from './componentes/almoxarifados/almoxarifados.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: IndexComponent, children: [
        {path: 'almoxarifados', component: AlmoxarifadosComponent}
    ]}
];
