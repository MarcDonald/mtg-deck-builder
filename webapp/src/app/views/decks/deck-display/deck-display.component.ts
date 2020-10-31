import { Component, Input, OnInit } from '@angular/core';
import DeckFull from '../../../models/deck-full';
import { DeckService } from '../../../services/deck.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-deck-display',
  templateUrl: './deck-display.component.html',
  styleUrls: ['./deck-display.component.scss'],
})
export class DeckDisplayComponent implements OnInit {
  @Input() deckId: Observable<string>;
  @Input() shouldRefresh: Observable<boolean>;
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
}
