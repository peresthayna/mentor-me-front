import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public iconCoruja: string = '../../../assets/coruja/c8.png';
  public type: string = 'password';
  public dialogOn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeType(): void {
    if(this.type == 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
