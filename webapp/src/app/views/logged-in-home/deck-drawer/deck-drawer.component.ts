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
  selectedDeck: string | null = null;
  @Output() deckSelected: EventEmitter<string> = new EventEmitter();

  page: Page<DeckShort[]>;
  error: null | string = null;

  ngOnInit(): void {
    this.makeApiRequest(1);
  }

  changePage(pageToGoTo: number) {
    this.makeApiRequest(pageToGoTo);
  }

  makeApiRequest(page: number) {
    this.deckService
      .getDecksForUser(this.authService.username, page)
      .pipe(catchError((err, caught) => (this.error = err.message)))
      .subscribe((page: Page<Array<DeckShort>>) => {
        if (page) {
          this.page = page;
        }
      });
  }

  selectDeck(deckId: string) {
    this.selectedDeck = deckId;
    this.deckSelected.emit(this.selectedDeck);
  }
}
