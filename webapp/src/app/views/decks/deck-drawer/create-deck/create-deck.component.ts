import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeckService } from '../../../../services/deck.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss'],
})
export class CreateDeckComponent implements OnInit {
  deckName = new FormControl('');
  error: string | null = null;
  @Output() deckCreated: EventEmitter<string> = new EventEmitter();

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckName.valueChanges.subscribe((value) => (this.error = null));
  }

  createDeck() {
    this.deckService
      .createDeck(this.deckName.value)
      .pipe(
        catchError((err, caught) => {
          this.error = err.error.message;
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.deckCreated.emit(res.deckId);
          this.deckName.setValue('');
        }
      });
  }
}
