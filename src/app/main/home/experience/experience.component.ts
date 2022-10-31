import { NgxSpinnerService } from 'ngx-spinner';
import { ExperienceService } from './../../../providers/experience.service';
import { ExperienceModel } from './../../../models/experience.model';
import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  experiencies: ExperienceModel[] = [];
  loading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private experienceService: ExperienceService) { }

  ngOnInit() {
    this.getExperience();
  }

  getExperience() {
    this.loading = true;
    this.experienceService.getAll()
      .subscribe({
        next: (v) => this.experiencies = v,
        error: (e) => {
          this.loading = false;
          console.log(e);
        },
        complete: () => this.loading = false
      })
  }


  get isLogged() {
    return this.authService.loggedIn;
  }

  onNew() {
    this.router.navigate(['experience', 'new'])
  }

  onEdit(id: number) {
    this.router.navigate(['experience', id])
  }

  onDelete(id: number) {
    this.spinner.show('save');
    this.experienceService.delete(id)
      .subscribe((response: any) => {
        this.getExperience();
        this.spinner.hide('save');
      },
        (response: any) => {
          this.spinner.hide('save');
        });
  }

}
