import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DeckCard from '../../../../models/deck-card';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailDialog } from '../../../dialogs/card-detail/card-detail.dialog';

@Component({
  selector: 'app-deck-card-item',
  templateUrl: './card-in-deck-display-item.component.html',
  styleUrls: ['./card-in-deck-display-item.component.scss'],
})
export class CardInDeckDisplayItem implements OnInit {
  @Input() card: DeckCard;
  @Output() removeCard: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCardDetails() {
    this.dialog.open(CardDetailDialog, {
      data: {
        name: this.card.name,
        abilities: this.card.abilities,
      },
    });
  }

  removeCardFromDeck() {
    this.removeCard.emit(this.card.cardDeckId);
  }
}
