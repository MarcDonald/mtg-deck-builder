import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DeckShort from '../../../../models/deck-short';

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

  constructor() {}

  ngOnInit(): void {}

  deleteDeck() {
    this.delete.emit(this.deck.id);
  }

  selectDeck() {
    this.deckSelected.emit(this.deck.id);
  }
}
