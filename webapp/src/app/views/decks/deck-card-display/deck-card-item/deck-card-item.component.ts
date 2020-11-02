import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DeckCard from '../../../../models/deck-card';

@Component({
  selector: 'app-deck-card-item',
  templateUrl: './deck-card-item.component.html',
  styleUrls: ['./deck-card-item.component.scss'],
})
export class DeckCardItemComponent implements OnInit {
  @Input() card: DeckCard;
  @Output() removeCard: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  removeClick() {
    this.removeCard.emit(this.card.cardDeckId);
  }
}
