import { Component, Input, OnInit } from '@angular/core';
import DeckShort from '../../../models/deck-short';

@Component({
  selector: 'app-user-deck-list',
  templateUrl: './user-deck-list.component.html',
  styleUrls: ['./user-deck-list.component.scss'],
})
export class UserDeckListComponent implements OnInit {
  @Input() decks: DeckShort[];

  constructor() {}

  ngOnInit(): void {}
}
