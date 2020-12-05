import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeckService } from '../../../../services/deck.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss'],
})
export class CreateDeckComponent implements OnInit {
  createDeckForm: FormGroup;
  @Output() deckCreated: EventEmitter<string> = new EventEmitter();

  constructor(
    private deckService: DeckService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createDeckForm = this.formBuilder.group({
      deckName: ['', Validators.required],
    });
  }

  createDeck() {
    const { deckName } = this.createDeckForm.value;
    this.deckService
      .createDeck(deckName)
      .pipe(
        catchError((err, caught) => {
          this.createDeckForm.setErrors(err.error.message);
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.deckCreated.emit(res.deckId);
          this.createDeckForm.reset();
        }
      });
  }
}
