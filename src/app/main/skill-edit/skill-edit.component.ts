import { SkillModel } from './../../models/skill.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SkillService } from 'src/app/providers/skill.service';
import { ExperienceModel } from './../../models/experience.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss']
})
export class SkillEditComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  item!: SkillModel;
  loading: boolean = true;
  constructor(private service: SkillService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        if (params['id']) {

          this.edit = true;
          this.spinner.show();
          this.getOne(params['id']);
        } else {
          this.edit = false;
          this.initForm();
        }
      });
  }

  getOne(id: number) {
    this.service.getOne(id)
      .subscribe({
        next: (v) => {
          this.item = v;

          this.initForm();
        },
        error: (e) => console.log(e),
        complete: () => this.spinner.hide()
      })
  }
  initForm() {
    if (this.edit) {
      this.form = this.formBuilder.group({
        nombre: [this.item!.nombre, Validators.required],
        porcentaje: [this.item!.porcentaje, Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        nombre: ['', Validators.required],
        porcentaje: ['', Validators.required],
      });
    }
    this.loading = false;
  }

  onSave() {
    this.spinner.show('save');
    if (this.edit) {
      this.service.update(this.item.id, this.form.value)
        .subscribe((response: any) => {
          this.spinner.hide('save');
          this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
        },
          (response: any) => {
            this.spinner.hide('save');
          });
    } else {
      this.service.create(this.form.value)
        .subscribe((response: any) => {
          this.spinner.hide('save');
          this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
        },
          (response: any) => {
            this.spinner.hide('save');
          });
    }
  }
}
