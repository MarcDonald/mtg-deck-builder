import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Page from '../../models/page';

@Component({
  selector: 'app-page-controls',
  templateUrl: './page-controls.component.html',
  styleUrls: ['./page-controls.component.scss'],
})
export class PageControlsComponent implements OnInit {
  private goToPageSubject: BehaviorSubject<number> = new BehaviorSubject(1);

  currentPage: number = 1;

  @Input() page: Page<any>;

  @Output()
  goToPage: Observable<number> = this.goToPageSubject.asObservable();

  constructor() {}

  ngOnInit(): void {}

  goToPreviousPage() {
    if (this.currentPage != 1) {
      this.currentPage -= 1;
      this.goToPageSubject.next(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage != this.page?.maxPage) {
      this.currentPage += 1;
      this.goToPageSubject.next(this.currentPage);
    }
  }
}
