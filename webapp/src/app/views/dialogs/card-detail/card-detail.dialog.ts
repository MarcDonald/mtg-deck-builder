import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Ability from '../../../models/ability';

interface CardDetailDialogData {
  abilities: Ability[];
  name: string;
}

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './card-detail.dialog.html',
  styleUrls: ['./card-detail.dialog.scss'],
})
export class CardDetailDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CardDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CardDetailDialogData
  ) {}

  ngOnInit(): void {}

  onCloseClick() {
    this.dialogRef.close();
  }
}
