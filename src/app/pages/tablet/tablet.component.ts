import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { Tablet } from 'src/app/models/tablet';
import { TabletService } from 'src/app/services/tablet.service';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';
import { AddTabletComponent } from './add-tablet/add-tablet.component';

@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {

  displayedColumns = ['srn', 'id', 'name', 'timestamp', 'actions'];
  dataSource: Tablet[] = [];
  index: number = 0;
  id: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog, private _spinner: NgxSpinnerService, private _tabletService: TabletService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this._spinner.show();
    this.dataSource = [];
    this._tabletService.getTablet().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.dataSource = res.result;
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddTabletComponent, {
      data: new Tablet()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
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
        this.load();
      }
    });
  }
  deleteItem(i: number, obj: Tablet) {
    this._spinner.show();
    this._tabletService.deleteTablet({ id: obj._id }).subscribe((res) => {
      this._spinner.hide();
      this.load();
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


}
