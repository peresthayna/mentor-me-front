import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacaoConsultaDTO } from 'src/app/shared/models/publicacao-consulta-dto.model';
import { PublicacaoService } from 'src/app/shared/services/publicacao.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {

  public publicacoes: PublicacaoConsultaDTO[] = [];
  public total: number = 0;
  public selectedMostRecent: boolean = true;
  public selectedMostOld: boolean = false;
  public selectedWithoutAnswer: boolean = false;
  public params: HttpParams = new HttpParams();

  constructor(
    private publicacaoService: PublicacaoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPublicacoesOrdenadasPorData();
  }

  public getPublicacoesOrdenadasPorData(): void {
    this.params = this.params.append('page',0);
    this.params = this.params.append('pageSize',10);
    this.publicacaoService.getPublicacoesOrdenadasPorData(this.params).subscribe(publicacoes => {
      this.publicacoes = publicacoes.items;
      this.total = publicacoes.totalElements;
    })
  }

  public onChangeFilter(filter: string): void {
    if(filter == 'recent') {
      this.selectedMostRecent = true;
      this.selectedMostOld = false;
      this.selectedWithoutAnswer = false;
      this.getPublicacoesOrdenadasPorData();
    } else if(filter == 'old') {
      this.selectedMostRecent = false;
      this.selectedMostOld = true;
      this.selectedWithoutAnswer = false;
    } else {
      this.selectedMostRecent = false;
      this.selectedMostOld = false;
      this.selectedWithoutAnswer = true;
    }
  }

  public onClickAdicionarPergunta(): void {
    this.router.navigate(['/home/nova-pergunta']);
  }

}
