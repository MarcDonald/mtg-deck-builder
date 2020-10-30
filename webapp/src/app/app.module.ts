import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardSearchBarComponent } from './views/logged-in-home/card-search/card-search-bar/card-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardSearchView } from './views/logged-in-home/card-search/card-search.view';
import { CardSearchResultsComponent } from './views/logged-in-home/card-search/card-search-results/card-search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { CardSearchResultItemComponent } from './views/logged-in-home/card-search/card-search-results/card-search-result-item/card-search-result-item.component';
import { LoggedOutHomeComponent } from './views/logged-out-home/logged-out-home.component';
import { LoggedInHomeComponent } from './views/logged-in-home/logged-in-home.component';
import { LoginComponent } from './views/logged-out-home/login/login.component';
import { RegisterComponent } from './views/logged-out-home/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CardSearchBarComponent,
    CardSearchView,
    CardSearchResultsComponent,
    CardSearchResultItemComponent,
    LoggedOutHomeComponent,
    LoggedInHomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
