import { Component, Input, OnInit } from '@angular/core';
import Card from '../../../../models/card';

@Component({
  selector: 'app-card-search-result-item',
  templateUrl: './card-search-result-item.component.html',
  styleUrls: ['./card-search-result-item.component.scss'],
})
export class CardSearchResultItemComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit(): void {}
}
