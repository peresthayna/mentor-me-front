import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TagConsultaDTO } from 'src/app/shared/models/tag-consulta-dto.model';
import { TagService } from 'src/app/shared/services/tag.service';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { TagCadastroDTO } from 'src/app/shared/models/tag-cadastro-dto.model';
import { PublicacaoService } from 'src/app/shared/services/publicacao.service';
import { PublicacaoCadastroDTO } from 'src/app/shared/models/publicacao-cadastro-dto.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fazer-publicacao',
  templateUrl: './fazer-publicacao.component.html',
  styleUrls: ['./fazer-publicacao.component.css']
})
export class FazerPublicacaoComponent implements OnInit {

  public publicacao: string;
  public titulo: string = '';
  public tag: string;
  public tags: TagConsultaDTO[] = [];
  public menu: boolean = true;
  public tagsBuscadas: TagConsultaDTO[] = [];
  private debounceSubject: Subject<string> = new Subject<string>();
  private debounceSubscription: Subscription;
  public isPublicacaoValid: boolean = false;
  public isAdicionarDisabled: boolean = true;
  public tagsSelecionaveisSeverity: string = 'info';
  public tagsSelecionadasSeverity: string = 'info';
  public tagNaoClicavel: boolean = false;
  public tituloValid: boolean = true;
  public publicacaoValid: boolean = true;

  constructor(
    private router: Router,
    private tagService: TagService,
    private publicacaoService: PublicacaoService
  ) { }

  ngOnInit(): void {
    this.getTags();
    this.debounceSubscription = this.debounceSubject.pipe(
      debounceTime(500)
    ).subscribe(searchTerm => {
      this.tagService.getTagsPorNome(searchTerm).subscribe(t => {
        if(t && t.length > 0) {
          this.isAdicionarDisabled = true;
          this.tagsBuscadas = t;
        } else {
          this.isAdicionarDisabled = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.debounceSubscription.unsubscribe();
  }

  public getTags(): void {
    this.tagService.getTagsOrdenadasPorData().subscribe(t => {
      this.tagsBuscadas = t;
    })
  }

  public adicionarTag(t: TagConsultaDTO): void {
    if(this.hideTagJaAdicionada(t)) {
      return;
    }
    if(this.tags.length < 5) {
      this.verificaArrayTagsCores();
      this.tags.push(t);
      this.tag = '';
      this.getTags();
    }
    this.verificaTamanhoArrayTags();
  }

  public adicionarTagNova(): void {
    if(this.tags.length < 5) {
      this.verificaArrayTagsCores();
      this.tags.push(new TagConsultaDTO(this.tag));
      this.tag = '';
      this.isAdicionarDisabled = true;
    }
    this.verificaTamanhoArrayTags();
  }

  public onOpenMenu(open: boolean): void {
    this.menu = open;
  }

  public getBusca(busca: string): void {
    this.router.navigate(['home']);
    alert(busca);
  }

  public excluirTag(tagEscolhida: TagConsultaDTO): void {
    let index = this.tags.indexOf(tagEscolhida);
    this.tags.splice(index, 1);
    this.verificaTamanhoArrayTags();
    this.verificaArrayTagsCores();
  }

  public onSearchTag(event): void {
    if(this.tag) {
      this.debounceSubject.next(this.tag);
    } else {
      this.getTags();
    }
  }

  public validatePublicacaoField(): void {
    if(this.publicacao.length > 149 && this.publicacao != '') {
      this.isPublicacaoValid = true;
    } else {
      this.isPublicacaoValid = false;
    }
  }

  public hideTagJaAdicionada(tagSelecionada: TagConsultaDTO): boolean {
    return !!this.tags.find(tag => tag.id === tagSelecionada.id);
  }

  public verificaTamanhoArrayTags(): void {
    if(this.tags.length == 5) {
      this.isAdicionarDisabled = true;
      this.tagsSelecionaveisSeverity = 'danger';
      this.tagsSelecionadasSeverity = 'success';
      this.tagNaoClicavel = true;
    }
  }

  public verificaArrayTagsCores(): void {
    this.tagNaoClicavel = false;
    this.tagsSelecionaveisSeverity = 'info';
    this.tagsSelecionadasSeverity = 'info';
  }

  public adicionarPublicacao(): void {
    this.titulo ? this.tituloValid = true : this.tituloValid = false;
    this.publicacao ? this.publicacaoValid = true : this.publicacaoValid = false;
    if(this.publicacaoValid && this.tituloValid) {
        const publicacaoNova: PublicacaoCadastroDTO = new PublicacaoCadastroDTO();
        publicacaoNova.titulo = this.titulo;
        publicacaoNova.publicacao = this.publicacao;
        publicacaoNova.tags = this.tags;
        this.publicacaoService.cadastrarPublicacao(publicacaoNova).subscribe(() => {
          alert('Pergunta feita com sucesso!');
          this.router.navigate(['/home']);
        },(httpError: HttpErrorResponse) => {
          alert('Erro ao publicar pergunta.');
      })
    }
  }

  public validateTitulo(): void {
    this.titulo.length > 0 ? this.tituloValid = true : this.tituloValid = false;
  }

  public validatePublicacao(): void {
    this.publicacao.length > 0 ? this.publicacaoValid = true : this.publicacaoValid = false;
  }
}
