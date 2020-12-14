import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { DeckService } from '../../services/deck.service';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Main decks page that contains the deck list drawer, the main deck
 * view and the ability to search and add cards to a deck
 */
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
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private deckService: DeckService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.constructHeaderTitle();
    this.route.paramMap.subscribe((params) =>
      this.selectedDeckSubject.next(params.get('deckId'))
    );
  }

  constructHeaderTitle() {
    this.userService.getCurrentUserDetails().subscribe((user) => {
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

  deckDeleted(deckId: string) {
    if (deckId === this.selectedDeckSubject.value) {
      this.router.navigateByUrl(`/decks`).then();
    }
  }

  addCard(cardId: string) {
    this.deckService
      .addCardToDeck(this.selectedDeckSubject.value, cardId)
      .pipe(
        catchError((err, caught) => {
          this.snackbar.open(err.error.message, null, {
            duration: 2000,
          });
          return of(null);
        })
      )
      .subscribe((value) => {
        this.refreshEmitter.emit(true);
      });
  }

  deckUpdated() {
    this.refreshEmitter.emit(true);
  }

  get showDeck(): boolean {
    return (
      this.selectedDeckSubject.value !== undefined &&
      this.selectedDeckSubject.value !== null
    );
  }
}
