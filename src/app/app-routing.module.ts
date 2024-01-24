import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './core/constants/appSettings';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: AppRoutes.login,
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: AppRoutes.register,
    loadComponent: () => import('./modules/auth/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: AppRoutes.resetPassword,
    loadComponent: () => import('./modules/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent),
  },
  {
    path: AppRoutes.dashboard,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: AppRoutes.employee,
    loadComponent: () => import('./modules/employee/employee-list/employee-list.component').then((c) => c.EmployeeListComponent),
    canActivate: [AuthGuard, RoleGuard],
  },
  { path: '', redirectTo: AppRoutes.dashboard, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
