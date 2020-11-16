import { Injectable } from '@angular/core';
import { ApiInteractorService } from './api-interactor.service';
import { Observable } from 'rxjs';
import DeckShort from '../models/deck-short';
import Page from '../models/page';
import DeckFull from '../models/deck-full';

interface AddCardToDeckResponse {
  cardDeckId: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private apiInteractor: ApiInteractorService) {}

  getUserDecks(pageNumber: number = 1): Observable<Page<Array<DeckShort>>> {
    return this.apiInteractor.get(`decks?page_num=${pageNumber}`, true);
  }

  getDeck(deckId: string): Observable<DeckFull> {
    return this.apiInteractor.get(`decks/${deckId}`, true);
  }

  addCardToDeck(
    deckId: string,
    cardId: string
  ): Observable<AddCardToDeckResponse> {
    return this.apiInteractor.post(`decks/${deckId}/${cardId}`, null, true);
  }

  removeCardFromDeck(deckId: string, cardDeckId: string): Observable<any> {
    return this.apiInteractor.delete(`decks/${deckId}/${cardDeckId}`, true);
  }

  deleteDeck(deckId: string): Observable<any> {
    return this.apiInteractor.delete(`decks/${deckId}`, true);
  }

  createDeck(deckName: string): Observable<string> {
    return this.apiInteractor.post(
      'decks',
      {
        deckName,
      },
      true
    );
  }
}
