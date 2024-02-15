import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly URL: string = 'http://127.0.0.1:8080/auth/cadastro';

  constructor(private http: HttpClient) { }
}
