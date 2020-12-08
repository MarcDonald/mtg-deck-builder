import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInteractorService } from './api-interactor.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private apiInteractor: ApiInteractorService) {}

  addNoteToDeck(deckId: string, noteMessage: string): Observable<string> {
    return this.apiInteractor.post(
      `notes/${deckId}`,
      {
        note: noteMessage,
      },
      true
    );
  }

  removeNoteFromDeck(deckId: string, noteId: string): Observable<string> {
    return this.apiInteractor.delete(`notes/${deckId}/${noteId}`, true);
  }

  updateNoteInDeck(
    deckId: string,
    noteId: string,
    noteMessage: string
  ): Observable<string> {
    return this.apiInteractor.put(
      `notes/${deckId}/${noteId}`,
      {
        note: noteMessage,
      },
      true
    );
  }
}
