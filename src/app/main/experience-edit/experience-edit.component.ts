import { NgxSpinnerService } from 'ngx-spinner';
import { ExperienceModel } from './../../models/experience.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/providers/experience.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss']
})
export class ExperienceEditComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  item!: ExperienceModel;
  loading: boolean = true;
  constructor(private service: ExperienceService,
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
        nombreE: [this.item!.nombreE, Validators.required],
        empresaE: [this.item!.empresaE, Validators.required],
        descripcionE: [this.item!.descripcionE, Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        nombreE: ['', Validators.required],
        empresaE: ['', Validators.required],
        descripcionE: ['', Validators.required],
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
