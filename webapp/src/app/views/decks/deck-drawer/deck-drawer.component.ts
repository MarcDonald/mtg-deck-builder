import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeckService } from '../../../services/deck.service';
import Page from '../../../models/page';
import DeckShort from '../../../models/deck-short';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TextInputDialog } from '../../dialogs/text-input-dialog/text-input.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-drawer',
  templateUrl: './deck-drawer.component.html',
  styleUrls: ['./deck-drawer.component.scss'],
})
export class DeckDrawerComponent implements OnInit {
  constructor(private deckService: DeckService, private dialog: MatDialog) {}

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
              console.error(err);
              return of(null);
            })
          )
          .subscribe((res) => {
            if (res) {
              this.makeApiRequest(this.page.pageNum);
            }
          });
      }
    });
  }
}
