import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng-lts/editor';
import { TagModule } from 'primeng-lts/tag';

import { ComponentesModule } from '../componentes/componentes.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FazerPublicacaoComponent } from './fazer-publicacao/fazer-publicacao.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PublicacaoComponent } from './publicacao/publicacao.component';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacaoComponent,
    FazerPublicacaoComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ReactiveFormsModule,
    TagModule
  ],
  exports: [
    MainComponent,
    LoginComponent,
    FazerPublicacaoComponent
  ]
})
export class MainModule { }
