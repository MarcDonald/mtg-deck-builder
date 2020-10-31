import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { DeckService } from '../../services/deck.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit {
  private refreshEmitter = new EventEmitter<boolean>();
  refresh = this.refreshEmitter.asObservable();
  private selectedDeckSubject = new BehaviorSubject<string | null>(null);
  selectedDeck = this.selectedDeckSubject.asObservable();
  headerTitle: string = 'Hi';

  constructor(
    private authService: AuthService,
    private router: Router,
    private deckService: DeckService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.constructHeaderTitle();
    this.route.paramMap.subscribe((params) =>
      this.selectedDeckSubject.next(params.get('deckId'))
    );
  }

  constructHeaderTitle() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.headerTitle = `Hi, ${user.givenName} ${user.familyName}`;
      }
    });
  }

  async logout() {
    this.authService.logout().subscribe((wasSuccess) => {
      if (wasSuccess) {
        this.router.navigateByUrl('/');
      }
    });
  }

  selectDeck(deckId: string) {
    this.router.navigateByUrl(`/decks/${deckId}`).then();
  }

  addCard(cardId: string) {
    this.deckService
      .addCardToDeck(this.selectedDeckSubject.value, cardId)
      .pipe(
        catchError((err, caught) => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe((value) => {
        this.refreshEmitter.emit(true);
      });
  }

  removeCardFromDeck(cardDeckId: string) {
    this.deckService
      .removeCardFromDeck(this.selectedDeckSubject.value, cardDeckId)
      .pipe(
        catchError((err, caught) => {
          console.error(err.message);
          return of(null);
        })
      )
      .subscribe((value) => {
        this.refreshEmitter.emit(true);
      });
  }

  get showDeck(): boolean {
    return (
      this.selectedDeckSubject.value !== undefined &&
      this.selectedDeckSubject.value !== null
    );
  }
}
