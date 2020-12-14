import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DeckShort from '../../../../models/deck-short';
import { AreYouSureDialog } from '../../../dialogs/are-you-sure/are-you-sure.dialog';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component intended to be used in a list to display brief information about a deck
 */
@Component({
  selector: 'app-user-deck-short-item',
  templateUrl: './user-deck-short-item.component.html',
  styleUrls: ['./user-deck-short-item.component.scss'],
})
export class UserDeckShortItemComponent implements OnInit {
  @Input() deck: DeckShort;
  @Input() selected: boolean = false;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() deckSelected: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  deleteDeck() {
    const dialogRef = this.dialog.open(AreYouSureDialog, {
      data: {
        content: `Are you sure you want to delete '${this.deck.name}'?`,
      },
    });
    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.delete.emit(this.deck.id);
      }
    });
  }

  selectDeck() {
    this.deckSelected.emit(this.deck.id);
  }
}
