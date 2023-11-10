import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTable, MatTableModule} from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { PersonResponseArray } from 'src/app/models/PersonResponseArray';
import { PersonResponse } from 'src/app/models/PersonResponse';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PersonService]
})
export class HomeComponent implements OnInit {


  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'BirthDate', 'actions'];
  dataSource!: Person[];
  constructor(public dialog: MatDialog, public personService:PersonService) {
    this.personService.getPerson().subscribe((data: PersonResponseArray) => {
      console.log(Object.values(data.data))
      this.dataSource = data.data;
    })
  }

  ngOnInit(): void {
  }

  openDialog(element: Person | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width : '250px',
      data: element === null ? {
        id: '',
        firstName : '',
        lastName : '',
        birthDate : ''
      } : {
        id: element.id,
        firstName : element.firstName,
        lastName : element.lastName,
        birthDate : element.birthDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if(this.dataSource.map(p => p.id).includes(result.id)) {
          this.personService.updatePerson(result)
            .subscribe(() => {
              const index = this.dataSource.findIndex(p => p.id === result.id);
              this.dataSource[index] = result;
              this.table.renderRows();
            })
        }
        else {
          this.personService.createPerson(result).subscribe((personResponse : PersonResponse) => {
            personResponse.data.birthDate = this.formatData(new Date(personResponse.data.birthDate));
            this.dataSource.push(personResponse.data);
            this.table.renderRows();
          }) 
        }
      }
    });
  }

  deleteElement(position: number) {
    this.personService.deletePerson(position).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== position);
    })
  }

  updateElement(element: Person) {
    this.openDialog(element)
  }

  private formatData(birthDate: Date): string {
    const day = birthDate.getDate()
    const month = birthDate.getMonth() + 1
    const year = birthDate.getFullYear()

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }

}
