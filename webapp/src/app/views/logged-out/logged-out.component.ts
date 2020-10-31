import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss'],
})
export class LoggedOutComponent implements OnInit {
  selectedAuthTab: 'Login' | 'Register' = 'Login';
  constructor() {}

  ngOnInit(): void {}

  switchTab(switchTo: 'Login' | 'Register') {
    this.selectedAuthTab = switchTo;
  }
}
