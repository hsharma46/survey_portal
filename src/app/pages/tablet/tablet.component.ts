import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tablet } from 'src/app/models/tablet';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';
import { AddTabletComponent } from './add-tablet/add-tablet.component';

const ELEMENT_DATA: Tablet[] = [
  { id: 'M4S001', tablet: 'T01', name: 'Raju', phone: '123', field_office: 'Yippee', team_code: '101', supervisor_code: 'Manoj', timestamp: getTimestampInSeconds(), email_id: 'abc@gmail.com', status: 'Active' },
  { id: 'M4S001', tablet: 'T02', name: 'Manoj', phone: '321', field_office: 'Yippee', team_code: '102', supervisor_code: 'Manoj', timestamp: getTimestampInSeconds(), email_id: 'abc@gmail.com', status: 'Active' },
  { id: 'M4S001', tablet: 'T03', name: 'Kamal', phone: '456', field_office: 'Yippee', team_code: '103', supervisor_code: 'Manoj', timestamp: getTimestampInSeconds(), email_id: 'abc@gmail.com', status: 'Active' },
];


@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {

  displayedColumns = ['srn', 'id', 'tablet', 'name', 'phone', 'field_office', 'team_code', 'supervisor_code', 'timestamp', 'email_id', 'status', 'actions'];
  dataSource = ELEMENT_DATA;
  index: number = 0;
  id: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog) { }

  ngOnInit() {

  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddTabletComponent, {
      data: new Tablet()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  reload() {

  }

  startEdit(i: number, obj: Tablet) {
    const dialogRef = this.dialogService.open(AddTabletComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }
  deleteItem(i: number, obj: any) {

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


}
