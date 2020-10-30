import { Injectable } from '@angular/core';
import { ApiInteractorService } from './api-interactor.service';
import { Observable } from 'rxjs';
import DeckShort from '../models/deck-short';
import Page from '../models/page';

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
}
