import { ProfileModel } from './../../../models/profile.model';
import { AboutService } from './../../../providers/about.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  profile?: ProfileModel;
  loading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private aboutService: AboutService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    //this.showLoading();
    this.loading = true;
    this.aboutService.getProfile()
      .subscribe({
        next: (v) => this.profile = v,
        error: (e) => {
          this.loading = false;
          console.log(e);
        },
        complete: () => this.loading = false
      })
    //  // .pipe(takeUntil(this.componentDestroyed))
    // .subscribe((profile: ProfileModel) => {
    //   this.profile = profile;

    //   //this.hideLoading();
    // },
    //   err => {
    //     console.log(err)
    //    // this.hideLoadingError();
    //     //this.toastr.error(err.message);
    //   });
  }

  goToEdit() {
    this.router.navigate(['about'])
  }

  get isLogged() {
    return this.authService.loggedIn;
  }
}
