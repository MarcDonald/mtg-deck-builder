import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Card from '../../../../models/card';

@Component({
  selector: 'app-card-search-result-item',
  templateUrl: './card-search-result-item.component.html',
  styleUrls: ['./card-search-result-item.component.scss'],
})
export class CardSearchResultItemComponent implements OnInit {
  @Input() card: Card;
  @Output() added: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addCard() {
    this.added.emit(this.card.id);
  }
}
