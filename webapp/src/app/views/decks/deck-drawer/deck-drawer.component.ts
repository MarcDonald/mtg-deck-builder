import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeckService } from '../../../services/deck.service';
import { AuthService } from '../../../services/auth.service';
import Page from '../../../models/page';
import DeckShort from '../../../models/deck-short';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  @Output() deckDeleted: EventEmitter<string> = new EventEmitter();
  @Input() shouldRefresh: Observable<boolean>;

  page: Page<DeckShort[]>;
  error: null | string = null;

  ngOnInit(): void {
    this.makeApiRequest(1);
    this.shouldRefresh.subscribe((value) => {
      if (value) this.makeApiRequest(this.page.pageNum);
    });
  }

  changePage(pageToGoTo: number) {
    this.makeApiRequest(pageToGoTo);
  }

  makeApiRequest(page: number) {
    this.deckService
      .getUserDecks(page)
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

  deleteDeck(deckId: string) {
    this.deckService.deleteDeck(deckId).subscribe((value) => {
      this.deckDeleted.emit(deckId);
      this.makeApiRequest(this.page.pageNum);
    });
  }
}
