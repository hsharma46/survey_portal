import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/models/product';
import { Tablet } from 'src/app/models/tablet';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';
import { AddProductComponent } from './add-product/add-product.component';


const ELEMENT_DATA: Product[] = [
  { id: 'M4S001', manufacturer: 'Nestle', category: 'Noodles', product: 'Maggi', comparison: 'Yippee', timestamp: getTimestampInSeconds(), assign_tablet: [] },
  { id: 'M4S002', manufacturer: 'Saffola', category: 'Noodles', product: 'Oodles', comparison: 'Maggi', timestamp: getTimestampInSeconds(), assign_tablet: [] },
  { id: 'M4S003', manufacturer: 'Sunfest', category: 'Noodles', product: 'Yippee', comparison: 'Oodles', timestamp: getTimestampInSeconds(), assign_tablet: [] },
];

const ELEMENT_DATA_TABLET: Tablet[] = [
  { id: 'M4S001', tablet: 'T01', name: 'Raju', phone: '123', field_office: 'Yippee', team_code: '101', supervisor_code: 'Manoj', timestamp: getTimestampInSeconds(), email_id: 'abc@gmail.com', status: 'Active' },
  { id: 'M4S001', tablet: 'T02', name: 'Manoj', phone: '321', field_office: 'Yippee', team_code: '102', supervisor_code: 'Manoj', timestamp: getTimestampInSeconds(), email_id: 'abc@gmail.com', status: 'Active' },
  { id: 'M4S001', tablet: 'T03', name: 'Kamal', phone: '456', field_office: 'Yippee', team_code: '103', supervisor_code: 'Manoj', timestamp: getTimestampInSeconds(), email_id: 'abc@gmail.com', status: 'Active' },
];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns = ['srn', 'id', 'manufacturer', 'category', 'product', 'comparison', 'timestamp', 'assign_tablet', 'actions'];
  dataSource = ELEMENT_DATA;
  index: number = 0;
  id: number = 0;
  datasourceTablet = ELEMENT_DATA_TABLET;
  assign_tablets = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog, private _spinner: NgxSpinnerService) { }



  ngOnInit() {
  }


  openAddDialog() {
    const dialogRef = this.dialogService.open(AddProductComponent, {
      data: new Product()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  reload() {

  }

  startEdit(i: number, obj: Product) {
    const dialogRef = this.dialogService.open(AddProductComponent, {
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
