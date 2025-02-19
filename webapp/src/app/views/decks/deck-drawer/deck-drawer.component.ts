import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeckService } from '../../../services/deck.service';
import Page from '../../../models/page';
import DeckShort from '../../../models/deck-short';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TextInputDialog } from '../../dialogs/text-input-dialog/text-input.dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Displays a list of the users decks, as well as the option to create a new deck
 */
@Component({
  selector: 'app-deck-drawer',
  templateUrl: './deck-drawer.component.html',
  styleUrls: ['./deck-drawer.component.scss'],
})
export class DeckDrawerComponent implements OnInit {
  @Input() shouldRefresh: Observable<boolean>;
  @Output() deckSelected: EventEmitter<string> = new EventEmitter();
  @Output() deckDeleted: EventEmitter<string> = new EventEmitter();

  selectedDeck: string | null = null;
  page: Page<DeckShort[]>;

  constructor(
    private deckService: DeckService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchDecks(1);
    this.shouldRefresh.subscribe((refresh) => {
      if (refresh) this.fetchDecks(this.page.pageNum);
    });
  }

  changePage(pageToGoTo: number) {
    this.fetchDecks(pageToGoTo);
  }

  fetchDecks(page: number) {
    this.deckService
      .getUserDecks(page)
      .pipe(
        catchError((err, caught) => {
          this.snackbar.open(err.error.message, null, {
            duration: 2000,
          });
          return of(null);
        })
      )
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
    this.deckService
      .deleteDeck(deckId)
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
          this.deckDeleted.emit(deckId);
          this.fetchDecks(this.page.pageNum);
        }
      });
  }

  displayCreateDeck() {
    const dialogRef = this.dialog.open(TextInputDialog, {
      data: {
        title: 'Create New Deck',
        inputLabel: 'Deck Name',
        positiveText: 'Create',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((inputtedText) => {
      if (inputtedText) {
        this.deckService
          .createDeck(inputtedText)
          .pipe(
            catchError((err, caught) => {
              this.snackbar.open(err.error.message, null, {
                duration: 2000,
              });
              return of(null);
            })
          )
          .subscribe((res) => {
            if (res) {
              this.fetchDecks(this.page.pageNum);
            }
          });
      }
    });
  }
}
