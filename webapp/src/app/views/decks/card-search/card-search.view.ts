import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardService } from '../../../services/card.service';
import Card from '../../../models/card';
import Page from '../../../models/page';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.view.html',
  styleUrls: ['./card-search.view.scss'],
})
export class CardSearchView implements OnInit {
  private searchTerm: string;
  page: Page<Array<Card>> = null;
  newSearch: EventEmitter<string> = new EventEmitter();
  @Output() cardAdded: EventEmitter<string> = new EventEmitter();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  onSearch(searchTerm: string) {
    if (searchTerm && typeof searchTerm === 'string') {
      this.searchTerm = searchTerm;
      this.newSearch.emit(searchTerm);
      this.makeApiRequest(1);
    }
  }

  makeApiRequest(pageNumber: number) {
    this.cardService
      .searchCards(this.searchTerm, pageNumber)
      .subscribe((page) => {
        this.page = page;
      });
  }

  goToPage(pageToGoTo: number) {
    this.makeApiRequest(pageToGoTo);
  }

  addCard(cardId: string) {
    this.cardAdded.emit(cardId);
  }
}
