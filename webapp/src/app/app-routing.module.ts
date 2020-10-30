import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardSearchView } from './views/card-search/card-search.view';

const routes: Routes = [{ path: 'search', component: CardSearchView }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
