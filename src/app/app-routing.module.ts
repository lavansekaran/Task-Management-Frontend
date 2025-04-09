import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AuthGuard } from './core/auth.guard';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
