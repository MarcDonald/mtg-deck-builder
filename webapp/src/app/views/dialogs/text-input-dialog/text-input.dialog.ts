import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface TextInputDialogData {
  title: string;
  inputLabel: string;
  positiveText: string;
  cancelText: string;
  defaultTextValue?: string;
}

/**
 * Dialog that allows the user to input text, then returns that text when closed
 */
@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input.dialog.html',
  styleUrls: ['./text-input.dialog.scss'],
})
export class TextInputDialog implements OnInit {
  inputForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TextInputDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TextInputDialogData
  ) {}

  ngOnInit(): void {
    const textInputValue = this.data.defaultTextValue
      ? this.data.defaultTextValue
      : '';
    this.inputForm = this.formBuilder.group({
      textInput: [textInputValue, Validators.required],
    });
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onPositiveClick() {
    this.dialogRef.close(this.inputForm.controls.textInput.value);
  }
}
