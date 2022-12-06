import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodayPlansComponent } from './today-plans/today-plans.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'form/:mode', component: EventFormComponent},
  {path: 'form/:mode/:id', component: EventFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
