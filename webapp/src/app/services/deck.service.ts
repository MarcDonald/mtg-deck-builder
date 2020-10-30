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

  getDecksForUser(
    username: string,
    pageNumber: number = 1
  ): Observable<Page<Array<DeckShort>>> {
    return this.apiInteractor.get(
      `decks/user/${username}?page_num=${pageNumber}`
    );
  }

  getDeck(deckId: string): Observable<DeckFull> {
    return this.apiInteractor.get(`decks/${deckId}`);
  }

  addCardToDeck(
    deckId: string,
    cardId: string
  ): Observable<AddCardToDeckResponse> {
    return this.apiInteractor.post(`decks/${deckId}/${cardId}`);
  }
}
