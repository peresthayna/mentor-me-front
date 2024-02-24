import { TagCadastroDTO } from './../models/tag-cadastro-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagConsultaDTO } from '../models/tag-consulta-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private readonly URL: string = 'http://127.0.0.1:8080/tag';

  constructor(private http: HttpClient) { }

  public getTagsOrdenadasPorData(): Observable<TagConsultaDTO[]> {
    return this.http.get<TagConsultaDTO[]>(this.URL);
  }

  public getTagsOrdenadasPorNome(): Observable<TagConsultaDTO[]> {
    return this.http.get<TagConsultaDTO[]>(this.URL + '/pesquisa-nome-asc');
  }

  public getTagsPorNome(nome: string): Observable<TagConsultaDTO[]> {
    return this.http.get<TagConsultaDTO[]>(this.URL + '/pesquisa/' + nome);
  }

  public getTagPorId(id: number): Observable<TagConsultaDTO> {
    return this.http.get<TagConsultaDTO>(this.URL + '/' + id);
  }

  public cadastrar(tagCadastro: TagCadastroDTO): void {
    this.http.post<TagCadastroDTO>(this.URL, tagCadastro);
  }

  public atualizar(idTag: number, tagCadastro: TagCadastroDTO): void {
    this.http.put<TagCadastroDTO>(this.URL + '/' + idTag, tagCadastro);
  }

}
