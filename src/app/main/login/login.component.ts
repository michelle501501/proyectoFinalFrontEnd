import { AuthService } from './../../providers/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.value.email == 'admin@developer.com' && this.loginForm.value.password == '123456') {
      const login = new LoginModel(this.loginForm.value.email, this.loginForm.value.password);
      this.authService.login(login);
      this.router.navigate(['']);
    } else {
      alert('Credenciales Incorrectas');
    }

  }

}
