import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL = 'https://meanstack123.herokuapp.com/api/auth';
  user: Users;

  constructor(private http: HttpClient, private router: Router) { 
    this.user = new Users();
  }
  signup(user: any){
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signin(user: any){
    return this.http.post<any>(this.URL + '/signin', user);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
