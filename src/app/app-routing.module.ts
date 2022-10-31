import { ProjectEditComponent } from './main/project-edit/project-edit.component';
import { SkillEditComponent } from './main/skill-edit/skill-edit.component';
import { EducationEditComponent } from './main/education-edit/education-edit.component';
import { EducationComponent } from './main/home/education/education.component';
import { ExperienceEditComponent } from './main/experience-edit/experience-edit.component';
import { AboutEditComponent } from './main/about-edit/about-edit.component';
import { LoginComponent } from './main/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutEditComponent
  },
  {
    path: 'about/:id',
    component: AboutEditComponent
  },
  {
    path: 'experience/new',
    component: ExperienceEditComponent
  },
  {
    path: 'experience/:id',
    component: ExperienceEditComponent
  },
  {
    path: 'education/new',
    component: EducationEditComponent
  },
  {
    path: 'education/:id',
    component: EducationEditComponent
  },
  {
    path: 'skill/new',
    component: SkillEditComponent
  },
  {
    path: 'skill/:id',
    component: SkillEditComponent
  },
  {
    path: 'project/new',
    component: ProjectEditComponent
  },
  {
    path: 'project/:id',
    component: ProjectEditComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
