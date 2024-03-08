import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioConsultaDTO } from '../models/usuario-consulta.dto.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly URL: string = 'http://127.0.0.1:8080/usuario';

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<UsuarioConsultaDTO[]> {
    return this.http.get<UsuarioConsultaDTO[]>(this.URL);
  }

  public getUsuarioNaSession(): Observable<UsuarioConsultaDTO> {
    return this.http.get<UsuarioConsultaDTO>(this.URL+'/usuario-ativo');
  }
}
