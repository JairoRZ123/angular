import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var M : any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(form?: NgForm){
    if(form) {
      this.authService.signup(form.value).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          M.toast({html: 'BIENVENIDO'});
          this.router.navigate(['/home']);

        },
        err => {
          M.toast({html: err});
        }
      );

    }
  }
}
