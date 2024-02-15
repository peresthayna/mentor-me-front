import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL: string = 'http://127.0.0.1:8080/auth/login';

  constructor(private http: HttpClient) { }

}
