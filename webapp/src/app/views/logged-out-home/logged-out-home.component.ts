import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logged-out-home',
  templateUrl: './logged-out-home.component.html',
  styleUrls: ['./logged-out-home.component.scss'],
})
export class LoggedOutHomeComponent implements OnInit {
  selectedAuthTab: 'Login' | 'Register' = 'Login';
  constructor() {}

  ngOnInit(): void {}

  switchTab(switchTo: 'Login' | 'Register') {
    this.selectedAuthTab = switchTo;
  }
}
