import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface AreYouSureDialogData {
  content: string;
}

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure.dialog.html',
  styleUrls: ['./are-you-sure.dialog.scss'],
})
export class AreYouSureDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AreYouSureDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AreYouSureDialogData
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
