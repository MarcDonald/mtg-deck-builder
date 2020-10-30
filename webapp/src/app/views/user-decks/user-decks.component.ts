import { Component, OnInit } from '@angular/core';
import DeckShort from '../../models/deck-short';
import { DeckService } from '../../services/deck.service';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import Page from '../../models/page';

@Component({
  selector: 'app-user-decks',
  templateUrl: './user-decks.component.html',
  styleUrls: ['./user-decks.component.scss'],
})
export class UserDecksComponent implements OnInit {
  constructor(
    private deckService: DeckService,
    private authService: AuthService
  ) {}

  page: Page<DeckShort[]>;
  currentPage: number = 1;
  error: null | string = null;

  ngOnInit(): void {
    this.makeApiRequest();
  }

  goToNextPage() {
    if (this.currentPage != this.page?.maxPage) {
      this.currentPage += 1;
      this.makeApiRequest();
    }
  }

  goToPreviousPage() {
    if (this.currentPage != 1) {
      this.currentPage -= 1;
      this.makeApiRequest();
    }
  }

  makeApiRequest() {
    this.deckService
      .getDecksForUser(this.authService.username, this.currentPage)
      .pipe(catchError((err, caught) => (this.error = err.message)))
      .subscribe((page) => {
        this.page = page;
      });
  }
}
