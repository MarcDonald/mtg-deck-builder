import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Card from '../models/card';
import Page from '../models/page';
import { ApiInteractorService } from './api-interactor.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private apiInteractor: ApiInteractorService) {}

  searchCards = (
    searchTerm: string,
    pageNumber: number = 1
  ): Observable<Page<Array<Card>>> =>
    this.apiInteractor.get(
      `cards/search/${searchTerm}?page_num=${pageNumber}`,
      true
    );
}
