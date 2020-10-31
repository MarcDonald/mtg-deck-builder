import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DeckFull from '../../../models/deck-full';
import { DeckService } from '../../../services/deck.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import card from '../../../models/card';

@Component({
  selector: 'app-deck-card-display',
  templateUrl: './deck-card-display.component.html',
  styleUrls: ['./deck-card-display.component.scss'],
})
export class DeckCardDisplayComponent implements OnInit {
  @Input() deckId: Observable<string>;
  @Input() shouldRefresh: Observable<boolean>;
  @Output() removeCard: EventEmitter<string> = new EventEmitter();
  deck: DeckFull;
  error: string | null = null;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckId.subscribe((id) => {
      this.makeApiRequest(id);
    });

    this.shouldRefresh.subscribe((should) => {
      if (should) {
        this.makeApiRequest(this.deck.id);
      }
    });
  }

  makeApiRequest(deckId: string) {
    this.deckService
      .getDeck(deckId)
      .pipe(
        catchError((err, caught) => {
          this.error = err.error.message;
          return of(null);
        })
      )
      .subscribe((value) => {
        if (value) {
          this.error = null;
          this.deck = value;
        }
      });
  }

  removeCardFromDeck(cardDeckId: string) {
    this.removeCard.emit(cardDeckId);
  }
}
