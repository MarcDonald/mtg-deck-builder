import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Card from '../../../../models/card';
import { CardDetailDialog } from '../../../dialogs/card-detail/card-detail.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-search-result-item',
  templateUrl: './card-search-result-item.component.html',
  styleUrls: ['./card-search-result-item.component.scss'],
})
export class CardSearchResultItemComponent implements OnInit {
  @Input() card: Card;
  @Output() added: EventEmitter<string> = new EventEmitter();

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

  addCard() {
    this.added.emit(this.card.id);
  }
}
