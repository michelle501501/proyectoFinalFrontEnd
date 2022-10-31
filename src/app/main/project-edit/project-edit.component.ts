import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectService } from './../../providers/project.service';
import { ProjectModel } from './../../models/project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  item!: ProjectModel;
  loading: boolean = true;
  constructor(private service: ProjectService,
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
        nombrePro: [this.item!.nombrePro, Validators.required],
        descripcionPro: [this.item!.descripcionPro, Validators.required],
        fechaPro: [this.item!.fechaPro, Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        nombrePro: ['', Validators.required],
        descripcionPro: ['', Validators.required],
        fechaPro: ['', Validators.required],
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
