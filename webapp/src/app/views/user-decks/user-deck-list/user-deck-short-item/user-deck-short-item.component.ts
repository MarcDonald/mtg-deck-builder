import { Component, Input, OnInit } from '@angular/core';
import DeckShort from '../../../../models/deck-short';

@Component({
  selector: 'app-user-deck-short-item',
  templateUrl: './user-deck-short-item.component.html',
  styleUrls: ['./user-deck-short-item.component.scss'],
})
export class UserDeckShortItemComponent implements OnInit {
  @Input() deck: DeckShort;

  constructor() {}

  ngOnInit(): void {}
}
