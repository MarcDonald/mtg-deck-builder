import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.view.html',
  styleUrls: ['./card-search.view.scss'],
})
export class CardSearchView implements OnInit {
  private searchTerm: string;
  cards = [];
  currentPage: number = 1;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  onSearch(searchTerm: string) {
    this.currentPage = 1;
    if (searchTerm && typeof searchTerm === 'string') {
      this.searchTerm = searchTerm;
      this.makeApiRequest();
    }
  }

  makeApiRequest() {
    this.cardService
      .searchCards(this.searchTerm, this.currentPage)
      .subscribe((page) => {
        this.cards = page.data;
      });
  }

  goToNextPage() {
    this.currentPage += 1;
    this.makeApiRequest();
  }

  goToPreviousPage() {
    if (this.currentPage != 1) {
      this.currentPage -= 1;
      this.makeApiRequest();
    }
  }
}
