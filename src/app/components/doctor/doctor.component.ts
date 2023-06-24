import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestapiService } from 'src/app/service/restapi.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface DialogData {
  title: string,
  buttonName: string,
  id: string,
  name: string,
  mobile: string,
  email: string,
  gender: string,
  department: string,
  birthdate: string,
  qualifications: string,
  status: string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Array to store selected items
  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = ['select', 'name', 'mobile', 'email', 'gender', 'department', 'birthdate', 'qualifications', 'status', 'action'];
  dataSource: any;
  totalDoctors!: number;

  constructor(public dialog: MatDialog, public restApi: RestapiService,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.restApi.getAllData('/Doctor').subscribe((result: any) => {
      console.log("RESULT", result);
      this.totalDoctors = result.length;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }

  openDialog() {

    const dialogRef = this.dialog.open(AddDoctorComponent, {
      width: '650px',
      hasBackdrop: true,
      // delayFocusTrap: false,
      disableClose: true,
      data: { title: 'Register Doctor', buttonName: 'Register' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.restApi.addSingleData('/Doctor', result).then((data: any) => {
          console.log(data);
        })
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  ngAfterViewInit() {

  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  // Select/deselect all checkboxes
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  // Check if all checkboxes are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  Docname() {
    alert("Docname");
  }

  editDoctor(element: any) {
    console.log("element", element);
    if (element.id === null || element.name === null) {
      return
    }

    let data = element; 
    data.title = 'Update Doctor';
    data.buttonName = 'Update'    
    const dialogRef = this.dialog.open(AddDoctorComponent, {
      width: '650px',
      hasBackdrop: true,
      // delayFocusTrap: false,
      disableClose: true,
      data: data
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        delete result.title
        delete result.buttonName;        
        this.restApi.updateSingleData('/Doctor', result.id, result).then((data: any) => {
          console.log(data);
        })
      }
    });

  }

  deleteDoctor(element: any) {
    this.restApi.deleteSingleData('Doctor', element.id).then((res:any) => {
      console.log("ressss", res);
    })
  }
}
