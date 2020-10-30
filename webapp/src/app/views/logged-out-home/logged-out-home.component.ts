import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-out-home',
  templateUrl: './logged-out-home.component.html',
  styleUrls: ['./logged-out-home.component.scss'],
})
export class LoggedOutHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
