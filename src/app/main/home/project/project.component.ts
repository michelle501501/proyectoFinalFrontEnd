import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectService } from './../../../providers/project.service';
import { ProjectModel } from './../../../models/project.model';
import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: ProjectModel[] = [];
  loading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.loading = true;
    this.projectService.getAll()
      .subscribe({
        next: (v) => this.projects = v,
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
    this.router.navigate(['project', 'new'])
  }

  onEdit(id: number) {
    this.router.navigate(['project', id])
  }

  onDelete(id: number) {
    this.spinner.show('save');
    this.projectService.delete(id)
      .subscribe((response: any) => {
        this.getProject();
        this.spinner.hide('save');
      },
        (response: any) => {
          this.spinner.hide('save');
        });
  }


}
