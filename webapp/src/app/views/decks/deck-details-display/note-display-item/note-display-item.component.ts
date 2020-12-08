import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Note from '../../../../models/note';
import { NoteService } from '../../../../services/note.service';
import { TextInputDialog } from '../../../dialogs/text-input-dialog/text-input.dialog';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AreYouSureDialog } from '../../../dialogs/are-you-sure/are-you-sure.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display-item.component.html',
  styleUrls: ['./note-display-item.component.scss'],
})
export class NoteDisplayItemComponent implements OnInit {
  @Input() note: Note;
  @Input() deckId: string;
  @Output() noteUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private noteService: NoteService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  deleteNote() {
    const dialogRef = this.dialog.open(AreYouSureDialog, {
      data: {
        content: `Are you sure you want to delete '${this.note.message}'?`,
      },
    });
    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.noteService
          .removeNoteFromDeck(this.deckId, this.note.id)
          .pipe(
            catchError((err, caught) => {
              this.snackbar.open(err.error.message, null, {
                duration: 2000,
              });
              return of(null);
            })
          )
          .subscribe((value) => {
            if (value) {
              this.noteUpdated.emit();
            }
          });
      }
    });
  }

  editNote() {
    const dialogRef = this.dialog.open(TextInputDialog, {
      width: '1000px',
      data: {
        title: 'Edit Note',
        inputLabel: 'Note',
        positiveText: 'Edit Note',
        cancelText: 'Cancel',
        defaultTextValue: this.note.message,
      },
    });

    dialogRef.afterClosed().subscribe((inputtedText) => {
      if (inputtedText) {
        this.noteService
          .updateNoteInDeck(this.deckId, this.note.id, inputtedText)
          .pipe(
            catchError((err, caught) => {
              this.snackbar.open(err.error.message, null, {
                duration: 2000,
              });
              return of(null);
            })
          )
          .subscribe((value) => {
            if (value) {
              this.noteUpdated.emit(value);
            }
          });
      }
    });
  }
}
