import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeckService } from '../../../services/deck.service';
import { AuthService } from '../../../services/auth.service';
import Page from '../../../models/page';
import DeckShort from '../../../models/deck-short';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-deck-drawer',
  templateUrl: './deck-drawer.component.html',
  styleUrls: ['./deck-drawer.component.scss'],
})
export class DeckDrawerComponent implements OnInit {
  constructor(
    private deckService: DeckService,
    private authService: AuthService
  ) {}
  @Output() deckSelected: EventEmitter<string> = new EventEmitter();

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
      .subscribe((page: Page<Array<DeckShort>>) => {
        if (page) {
          this.page = page;
        }
      });
  }

  selectDeck(deckId: string) {
    this.deckSelected.emit(deckId);
  }
}
