import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DeckFull from '../../../models/deck-full';
import { DeckService } from '../../../services/deck.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TextInputDialog } from '../../dialogs/text-input-dialog/text-input.dialog';

@Component({
  selector: 'app-deck-card-display',
  templateUrl: './deck-card-display.component.html',
  styleUrls: ['./deck-card-display.component.scss'],
})
export class DeckCardDisplayComponent implements OnInit {
  @Input() deckId: Observable<string>;
  @Input() shouldRefresh: Observable<boolean>;
  @Output() deckUpdated: EventEmitter<object> = new EventEmitter<object>();
  deck: DeckFull;
  error: string | null = null;

  constructor(private deckService: DeckService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.deckId.subscribe((id) => {
      this.loadDeck(id);
    });

    this.shouldRefresh.subscribe((shouldRefresh) => {
      if (shouldRefresh) {
        this.loadDeck(this.deck.id);
      }
    });
  }

  loadDeck(deckId: string) {
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
    const deckId = this.deck.id;
    this.deckService
      .removeCardFromDeck(deckId, cardDeckId)
      .pipe(
        catchError((err, caught) => {
          console.error(err.message);
          return of(null);
        })
      )
      .subscribe((value) => {
        this.loadDeck(deckId);
      });
  }

  onEditDeck() {
    const dialogRef = this.dialog.open(TextInputDialog, {
      data: {
        title: 'Edit Deck Name',
        inputLabel: 'Deck Name',
        positiveText: 'Change Deck Name',
        cancelText: 'Cancel',
        defaultTextValue: this.deck.name,
      },
    });

    dialogRef.afterClosed().subscribe((inputtedText) => {
      if (inputtedText) {
        this.deckService
          .updateDeck(this.deck.id, inputtedText)
          .pipe(
            catchError((err, caught) => {
              this.error = err.error.message;
              return of(null);
            })
          )
          .subscribe((value) => {
            this.deckUpdated.emit(value);
          });
      }
    });
  }
}
