import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInHomeComponent } from './views/logged-in-home/logged-in-home.component';
import { LoggedOutHomeComponent } from './views/logged-out-home/logged-out-home.component';
import { LogoutGuard } from './guards/logout.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: LoggedOutHomeComponent, canActivate: [LogoutGuard] },
  { path: 'home', component: LoggedInHomeComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
