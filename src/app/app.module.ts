import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/home/header/header.component';
import { HomeComponent } from './main/home/home.component';
import { BannerComponent } from './main/home/banner/banner.component';
import { AboutComponent } from './main/home/about/about.component';
import { ExperienceComponent } from './main/home/experience/experience.component';
import { EducationComponent } from './main/home/education/education.component';
import { SkillComponent } from './main/home/skill/skill.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProjectComponent } from './main/home/project/project.component';
import { FooterComponent } from './main/home/footer/footer.component';
import { LoginComponent } from './main/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonEditComponent } from './main/home/button-edit/button-edit.component';
import { AboutEditComponent } from './main/about-edit/about-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ExperienceEditComponent } from './main/experience-edit/experience-edit.component';
import { EducationEditComponent } from './main/education-edit/education-edit.component';
import { SkillEditComponent } from './main/skill-edit/skill-edit.component';
import { ProjectEditComponent } from './main/project-edit/project-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BannerComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    SkillComponent,
    ProjectComponent,
    FooterComponent,
    LoginComponent,
    ButtonEditComponent,
    AboutEditComponent,
    ExperienceEditComponent,
    EducationEditComponent,
    SkillEditComponent,
    ProjectEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    }),
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
