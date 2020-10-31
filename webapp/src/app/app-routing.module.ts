import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecksComponent } from './views/decks/decks.component';
import { LoggedOutComponent } from './views/logged-out/logged-out.component';
import { LogoutGuard } from './guards/logout.guard';
import { LoginGuard } from './guards/login.guard';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoggedOutComponent, canActivate: [LogoutGuard] },
  {
    path: 'decks',
    component: DecksComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'decks/:deckId',
    component: DecksComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
