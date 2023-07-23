import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './MyComponent/landing/landing.component';
import { SignupComponent } from './MyComponent/signup/signup.component';
import { LoginComponent } from './MyComponent/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './MyComponent/project/project.component';
import { ManagerComponent } from './MyComponent/manager/manager.component';
import { ManagerItemComponent } from './MyComponent/manager-item/manager-item.component';
import { ProjectItemComponent } from './MyComponent/project-item/project-item.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    LoginComponent,
    ProjectComponent,
    ManagerComponent,
    ManagerItemComponent,
    ProjectItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
