import { NgxSpinnerService } from 'ngx-spinner';
import { EducationService } from './../../../providers/education.service';
import { EducationModel } from './../../../models/education.model';
import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  educations: EducationModel[] = [];
  loading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private educationService: EducationService) { }

  ngOnInit() {
    this.getEducation();
  }

  getEducation() {
    this.loading = true;
    this.educationService.getAll()
      .subscribe({
        next: (v) => this.educations = v,
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
    this.router.navigate(['education', 'new'])
  }

  onEdit(id: number) {
    this.router.navigate(['education', id])
  }

  onDelete(id: number) {
    this.spinner.show('save');
    this.educationService.delete(id)
      .subscribe((response: any) => {
        this.getEducation();
        this.spinner.hide('save');
      },
        (response: any) => {
          this.spinner.hide('save');
        });
  }

}
