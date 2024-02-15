import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentesModule } from '../componentes/componentes.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CadastroComponent } from './cadastro/cadastro.component';



@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MainComponent,
    LoginComponent
  ]
})
export class MainModule { }
