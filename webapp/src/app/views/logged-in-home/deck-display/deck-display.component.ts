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
  deck: DeckFull;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckId.subscribe((id) => {
      this.deckService
        .getDeck(id)
        .pipe(
          catchError((err, caught) => {
            console.error(err.message);
            return of(null);
          })
        )
        .subscribe((value) => {
          if (value) {
            this.deck = value;
          }
        });
    });
  }
}
