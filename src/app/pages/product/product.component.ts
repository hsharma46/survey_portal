import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/models/product';
import { ServerResponse } from 'src/app/models/server';
import { Tablet } from 'src/app/models/tablet';
import { ProductService } from 'src/app/services/product.service';
import { TabletService } from 'src/app/services/tablet.service';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';
import { AddProductComponent } from './add-product/add-product.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns = ['srn', 'id', 'manufacturer', 'category', 'product', 'comparison', 'timestamp', 'assign_tablet', 'actions'];
  dataSource: Product[] = [];
  index: number = 0;
  id: number = 0;
  datasourceTablet: Tablet[] = [];
  assign_tablets: any = new FormControl('');
  selectedDocs: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('tabletSelect') tabletSelect: MatSelect;


  constructor(public dialogService: MatDialog, private _spinner: NgxSpinnerService,
    private _productService: ProductService,
    private _tabletService: TabletService
  ) { }


  ngOnInit() {
    this.load();
    this.loadTablet();
  }

  loadTablet() {
    this.datasourceTablet = [];
    this._tabletService.getTablet().subscribe((res: ServerResponse) => {
      if (res.result.length > 0) {
        this.datasourceTablet = res.result;
      }
    });
  }

  load() {
    this._spinner.show();
    this.dataSource = [];
    this._productService.getProduct().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.dataSource = res.result;
      }
    });
  }


  openAddDialog() {
    const dialogRef = this.dialogService.open(AddProductComponent, {
      data: new Product()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
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
        this.load();
      }
    });
  }

  deleteItem(i: number, obj: Product) {
    this._spinner.show();
    this._productService.deleteProduct({ id: obj._id }).subscribe((res) => {
      this._spinner.hide();
      this.load();
    },(err)=>{
      this._spinner.hide();
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  onSelect(event: any, obj: Product) {
    if (event.isUserInput) {
      if (event.source.selected) {
        if (!!this.selectedDocs[obj._id] && this.selectedDocs[obj._id].length > 0) {
          this.selectedDocs[obj._id].push(event.source.value);
        } else {
          this.selectedDocs[obj._id] = [];
          this.selectedDocs[obj._id].push(event.source.value);
        }
      } else {
        this.selectedDocs[obj._id] = this.selectedDocs[obj._id].filter((d: any) => d !== event.source.value)
      }
    }
    console.log(this.selectedDocs);
  }

  onLinkTablet(obj: Product) {
    console.log(obj);
    const body = this.selectedDocs[obj._id];
    this._spinner.show();
    this._productService.linkProductWithTablet({ id: obj._id }, body).subscribe((res: ServerResponse) => {
      this._spinner.hide();
      this.load();
    }, (err) => {
      this._spinner.hide();
    });
  }

}
