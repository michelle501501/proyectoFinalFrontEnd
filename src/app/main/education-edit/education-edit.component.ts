import { EducationModel } from './../../models/education.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EducationService } from './../../providers/education.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss']
})
export class EducationEditComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  item!: EducationModel;
  loading: boolean = true;
  constructor(private service: EducationService,
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
        descripcionE: [this.item!.descripcionE, Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        nombreE: ['', Validators.required],
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
