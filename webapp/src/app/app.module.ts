import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardSearchBarComponent } from './views/decks/card-search/card-search-bar/card-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardSearchView } from './views/decks/card-search/card-search.view';
import { HttpClientModule } from '@angular/common/http';
import { CardSearchResultItemComponent } from './views/decks/card-search/card-search-result-item/card-search-result-item.component';
import { LoggedOutComponent } from './views/logged-out/logged-out.component';
import { DecksComponent } from './views/decks/decks.component';
import { LoginComponent } from './views/logged-out/login/login.component';
import { RegisterComponent } from './views/logged-out/register/register.component';
import { UserDeckShortItemComponent } from './views/decks/deck-drawer/user-deck-short-item/user-deck-short-item.component';
import { HeaderComponent } from './components/header/header.component';
import { DeckDrawerComponent } from './views/decks/deck-drawer/deck-drawer.component';
import { DeckCardDisplayComponent } from './views/decks/deck-card-display/deck-card-display.component';
import { PageControlsComponent } from './components/page-controls/page-controls.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { DeckCardItemComponent } from './views/decks/deck-card-display/deck-card-item/deck-card-item.component';
import { ProfileComponent } from './views/profile/profile.component';
import { CreateDeckComponent } from './views/decks/deck-drawer/create-deck/create-deck.component';

@NgModule({
  declarations: [
    AppComponent,
    CardSearchBarComponent,
    CardSearchView,
    CardSearchResultItemComponent,
    LoggedOutComponent,
    DecksComponent,
    LoginComponent,
    RegisterComponent,
    UserDeckShortItemComponent,
    HeaderComponent,
    DeckDrawerComponent,
    DeckCardDisplayComponent,
    PageControlsComponent,
    PageNotFoundComponent,
    DeckCardItemComponent,
    ProfileComponent,
    CreateDeckComponent,
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
