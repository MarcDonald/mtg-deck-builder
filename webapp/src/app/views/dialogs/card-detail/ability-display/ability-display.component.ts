import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Ability from '../../../../models/ability';

@Component({
  selector: 'app-ability-display',
  templateUrl: './ability-display.component.html',
  styleUrls: ['./ability-display.component.scss'],
})
export class AbilityDisplayComponent implements OnInit, AfterViewInit {
  @Input() ability: Ability;
  disableAnimation = true;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Fix for bug in Angular Material where expansion panel opens for split
    // second when the dialog opens
    // https://github.com/angular/components/issues/13870#issuecomment-502071712
    setTimeout(() => (this.disableAnimation = false));
  }
}
