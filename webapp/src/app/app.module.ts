import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardSearchBarComponent } from './views/card-search/card-search-bar/card-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardSearchView } from './views/card-search/card-search.view';
import { CardSearchResultsComponent } from './views/card-search/card-search-results/card-search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { CardSearchResultItemComponent } from './views/card-search/card-search-results/card-search-result-item/card-search-result-item.component';
import { LoggedOutHomeComponent } from './views/logged-out-home/logged-out-home.component';
import { LoggedInHomeComponent } from './views/logged-in-home/logged-in-home.component';
import { LoginComponent } from './views/logged-out-home/login/login.component';
import { RegisterComponent } from './views/logged-out-home/register/register.component';
import { UserDecksComponent } from './views/user-decks/user-decks.component';
import { UserDeckListComponent } from './views/user-decks/user-deck-list/user-deck-list.component';
import { UserDeckShortItemComponent } from './views/user-decks/user-deck-list/user-deck-short-item/user-deck-short-item.component';

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
    UserDecksComponent,
    UserDeckListComponent,
    UserDeckShortItemComponent,
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
