import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacaoConsultaDTO } from 'src/app/shared/models/publicacao-consulta-dto.model';
import { PublicacaoService } from 'src/app/shared/services/publicacao.service';

@Component({
  selector: 'app-detalhes-publicacao',
  templateUrl: './detalhes-publicacao.component.html',
  styleUrls: ['./detalhes-publicacao.component.css']
})
export class DetalhesPublicacaoComponent implements OnInit {

  public menu: boolean = true;
  public idPublicacao: string;
  public publicacaoEscolhida: PublicacaoConsultaDTO;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private publicacaoService: PublicacaoService
  ) { }

  ngOnInit(): void {
    this.getIdParam();
  }

  public onOpenMenu(open: boolean): void {
    this.menu = open;
  }

  public getBusca(busca: string): void {
    this.router.navigate(['home']);
    alert(busca);
  }

  public getIdParam(): void {
    this.idPublicacao = this.route.snapshot.paramMap.get('id')!;
    if(this.idPublicacao == null) {
      this.router.navigate(['home']);
    }
    this.getPublicacaoEscolhida();
  }

  public getPublicacaoEscolhida(): void {
    this.publicacaoService.getPublicacaoPorId(parseInt(this.idPublicacao)).subscribe(pub => {
      pub.publicacao = pub.publicacao.replace("<img","<br><img");
      this.publicacaoEscolhida = pub;
    });
  }
}
