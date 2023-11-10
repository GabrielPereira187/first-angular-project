import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Person } from 'src/app/models/Person';


@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {

  element!: Person
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Person,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void {
    if(this.data.id != null) {
      this.isChange = true
    } else {
      this.isChange = false
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
