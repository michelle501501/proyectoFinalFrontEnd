import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['login'])
  }
  
  onLogout() {
    this.authService.logout();
  }

  get isLogged() {
    return this.authService.loggedIn;
  }
}
