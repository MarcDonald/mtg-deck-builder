import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardSearchBarComponent } from './views/card-search/card-search-bar/card-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardSearchView } from './views/card-search/card-search.view';
import { HttpClientModule } from '@angular/common/http';
import { CardSearchResultItemComponent } from './views/card-search/card-search-result-item/card-search-result-item.component';
import { LoggedOutHomeComponent } from './views/logged-out-home/logged-out-home.component';
import { DecksComponent } from './views/decks/decks.component';
import { LoginComponent } from './views/logged-out-home/login/login.component';
import { RegisterComponent } from './views/logged-out-home/register/register.component';
import { UserDeckShortItemComponent } from './views/decks/deck-drawer/user-deck-short-item/user-deck-short-item.component';
import { HeaderComponent } from './components/header/header.component';
import { DeckDrawerComponent } from './views/decks/deck-drawer/deck-drawer.component';
import { DeckDisplayComponent } from './views/decks/deck-display/deck-display.component';
import { PageControlsComponent } from './components/page-controls/page-controls.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CardSearchBarComponent,
    CardSearchView,
    CardSearchResultItemComponent,
    LoggedOutHomeComponent,
    DecksComponent,
    LoginComponent,
    RegisterComponent,
    UserDeckShortItemComponent,
    HeaderComponent,
    DeckDrawerComponent,
    DeckDisplayComponent,
    PageControlsComponent,
    PageNotFoundComponent,
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
