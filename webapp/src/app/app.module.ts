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

@NgModule({
  declarations: [
    AppComponent,
    CardSearchBarComponent,
    CardSearchView,
    CardSearchResultsComponent,
    CardSearchResultItemComponent,
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
