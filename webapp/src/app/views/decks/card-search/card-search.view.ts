import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardService } from '../../../services/card.service';
import Card from '../../../models/card';
import Page from '../../../models/page';
import { FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.view.html',
  styleUrls: ['./card-search.view.scss'],
})
export class CardSearchView implements OnInit {
  page: Page<Array<Card>> = null;
  newSearch: EventEmitter<string> = new EventEmitter();
  searchTerm = new FormControl('');

  @Output() cardAdded: EventEmitter<string> = new EventEmitter();

  constructor(
    private cardService: CardService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSearch() {
    if (this.searchTerm.value) {
      this.newSearch.emit(this.searchTerm.value);
      this.doSearch(1);
    }
  }

  doSearch(pageNumber: number) {
    this.cardService
      .searchCards(this.searchTerm.value, pageNumber)
      .pipe(
        catchError((err) => {
          this.snackbar.open(err.error.message, null, {
            duration: 2000,
          });
          return of(null);
        })
      )
      .subscribe((page) => {
        this.page = page;
      });
  }

  goToPage(pageToGoTo: number) {
    this.doSearch(pageToGoTo);
  }

  addCard(cardId: string) {
    this.cardAdded.emit(cardId);
  }
}
