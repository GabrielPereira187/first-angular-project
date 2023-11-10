import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PeriodicElement } from 'src/app/views/home/home.component';


@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {

  element!: PeriodicElement
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void {
    if(this.data.position != null) {
      this.isChange = true
    } else {
      this.isChange = false
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
