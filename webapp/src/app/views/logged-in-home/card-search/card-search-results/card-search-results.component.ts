import { Component, Input, OnInit } from '@angular/core';
import Card from '../../../../models/card';

@Component({
  selector: 'app-card-search-results',
  templateUrl: './card-search-results.component.html',
  styleUrls: ['./card-search-results.component.scss'],
})
export class CardSearchResultsComponent implements OnInit {
  @Input() cards: Array<Card>;

  constructor() {}

  ngOnInit(): void {}
}
