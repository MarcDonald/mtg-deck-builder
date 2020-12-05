import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure.dialog.html',
  styleUrls: ['./are-you-sure.dialog.scss'],
})
export class AreYouSureDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AreYouSureDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
