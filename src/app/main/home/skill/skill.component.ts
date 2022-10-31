import { NgxSpinnerService } from 'ngx-spinner';
import { SkillModel } from './../../../models/skill.model';
import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillService } from 'src/app/providers/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  skils: { name: string, value: number }[] = [
    { name: 'Angular', value: 90 },
    { name: 'HTML', value: 80 },
    { name: 'CSS', value: 70 },
  ];

  skilsList: SkillModel[] = [];
  loading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private skillService: SkillService) { }

  ngOnInit() {
    this.getSkill();
  }

  getSkill() {
    this.loading = true;
    this.skillService.getAll()
      .subscribe({
        next: (v) => this.skilsList = v,
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
    this.router.navigate(['skill', 'new'])
  }

  onEdit(id: number) {
    this.router.navigate(['skill', id])
  }

  onDelete(id: number) {
    this.spinner.show('save');
    this.skillService.delete(id)
      .subscribe((response: any) => {
        this.getSkill();
        this.spinner.hide('save');
      },
        (response: any) => {
          this.spinner.hide('save');
        });
  }


}
