import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Page from '../../models/page';

/**
* Controls for navigating paginated data
*/
@Component({
  selector: 'app-page-controls',
  templateUrl: './page-controls.component.html',
  styleUrls: ['./page-controls.component.scss'],
})
export class PageControlsComponent implements OnInit {
  private goToPageSubject: BehaviorSubject<number> = new BehaviorSubject(1);

  currentPage: number = 1;

  @Input() page: Page<any>;
  @Input() reset: Observable<any> = of(null);

  @Output()
  goToPage: Observable<number> = this.goToPageSubject.asObservable();

  constructor() {}

  ngOnInit(): void {
    this.reset.subscribe((value) => {
      if (value) {
        this.currentPage = 1;
      }
    });
  }

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
