import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouts } from './core/constants/appSettings';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: AppRouts.login,
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: AppRouts.dashboard,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
  },
  { path: '', redirectTo: AppRouts.dashboard, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
