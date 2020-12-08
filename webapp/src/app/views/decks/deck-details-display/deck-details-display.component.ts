import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DeckFull from '../../../models/deck-full';
import { DeckService } from '../../../services/deck.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TextInputDialog } from '../../dialogs/text-input-dialog/text-input.dialog';
import { NoteService } from '../../../services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deck-details-display',
  templateUrl: './deck-details-display.component.html',
  styleUrls: ['./deck-details-display.component.scss'],
})
export class DeckDetailsDisplayComponent implements OnInit {
  @Input() deckId: Observable<string>;
  @Input() shouldRefresh: Observable<boolean>;
  @Output() deckUpdated: EventEmitter<any> = new EventEmitter<any>();

  deck: DeckFull;
  error: string | null = null;

  constructor(
    private deckService: DeckService,
    private noteService: NoteService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

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
          this.snackbar.open(err.error.message, null, {
            duration: 2000,
          });
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
          this.snackbar.open(err.error.message, null, {
            duration: 2000,
          });
          return of(null);
        })
      )
      .subscribe((value) => {
        if (value) {
          this.loadDeck(deckId);
          this.deckUpdated.emit();
        }
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
              this.snackbar.open(err.error.message, null, {
                duration: 2000,
              });
              return of(null);
            })
          )
          .subscribe((value) => {
            if (value) {
              this.deckUpdated.emit(value);
            }
          });
      }
    });
  }

  addNewNote() {
    const dialogRef = this.dialog.open(TextInputDialog, {
      width: '1000px',
      data: {
        title: 'Add New Note',
        inputLabel: 'Note',
        positiveText: 'Add Note',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((inputtedText) => {
      if (inputtedText) {
        this.noteService
          .addNoteToDeck(this.deck.id, inputtedText)
          .pipe(
            catchError((err, caught) => {
              this.error = err.error.message;
              this.snackbar.open(err.error.message, null, {
                duration: 2000,
              });
              return of(null);
            })
          )
          .subscribe((value) => {
            if (value) {
              this.deckUpdated.emit();
            }
          });
      }
    });
  }

  onNoteUpdated() {
    this.deckUpdated.emit();
  }
}
