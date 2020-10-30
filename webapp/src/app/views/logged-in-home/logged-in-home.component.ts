import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-logged-in-home',
  templateUrl: './logged-in-home.component.html',
  styleUrls: ['./logged-in-home.component.scss'],
})
export class LoggedInHomeComponent implements OnInit {
  private selectedDeckSubject = new BehaviorSubject<string | null>(null);
  selectedDeck = this.selectedDeckSubject.asObservable();
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
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
    this.selectedDeckSubject.next(deckId);
  }

  get showDeck(): boolean {
    return (
      this.selectedDeckSubject.value !== undefined &&
      this.selectedDeckSubject.value !== null
    );
  }
}
