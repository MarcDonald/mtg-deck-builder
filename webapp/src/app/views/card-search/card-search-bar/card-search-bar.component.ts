import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-search-bar',
  templateUrl: './card-search-bar.component.html',
  styleUrls: ['./card-search-bar.component.scss'],
})
export class CardSearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchTerm = new FormControl('');

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.search.emit(this.searchTerm.value);
  }
}
