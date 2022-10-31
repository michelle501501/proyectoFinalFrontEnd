import { AboutService } from './../../providers/about.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfileModel } from 'src/app/models/profile.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.scss']
})
export class AboutEditComponent implements OnInit {
  form!: FormGroup;
  edit: boolean = false;
  profile!: ProfileModel;
  loading: boolean = false;
  constructor(private aboutService: AboutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.aboutService.getProfile()
      .subscribe({
        next: (v) => {
          this.profile = v;
          this.initForm();
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete')
      })
  }
  initForm() {
    this.form = this.formBuilder.group({
      nombre: [this.profile!.nombre, Validators.required],
      apellido: [this.profile!.apellido, Validators.required],
      puesto: [this.profile!.puesto, Validators.required],
      bio: [this.profile!.bio, Validators.required],
      img: [this.profile!.img, Validators.required],
    });

  }

  onSave(){
    this.spinner.show('save');
    this.aboutService.update(this.form.value)
        .subscribe((response: any) => {
            this.spinner.hide('save');
            this.router.navigate(['../'], {relativeTo: this.activatedRoute});
            // this.onBack();
            // this.toastr.success(response.message);
          },
          (response: any) => {
             this.spinner.hide('save');
            // this.toastr.error(response.message);
          });
  }


}
