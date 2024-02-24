import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarLogadoComponent } from './navbar-logado/navbar-logado.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarLogadoComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    NavbarLogadoComponent,
    MenuComponent
  ]
})
export class ComponentesModule { }
