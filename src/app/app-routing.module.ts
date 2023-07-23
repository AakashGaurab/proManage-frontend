import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './MyComponent/landing/landing.component';
import { SignupComponent } from './MyComponent/signup/signup.component';
import { LoginComponent } from './MyComponent/login/login.component';
import { ManagerComponent } from './MyComponent/manager/manager.component';
import { ProjectComponent } from './MyComponent/project/project.component';
import { ManagerItemComponent } from './MyComponent/manager-item/manager-item.component';
import { ProjectItemComponent } from './MyComponent/project-item/project-item.component';
const routes: Routes = [
  {path:"landing",component:LandingComponent},
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"manager",component:ManagerComponent},
  {path:"project",component:ProjectComponent},
  {path:"project-item",component:ProjectItemComponent},
  {path:"manager-item",component:ManagerItemComponent},
  {path:"", redirectTo:"/landing", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
