import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/models/product';
import { ServerResponse } from 'src/app/models/server';
import { ProductService } from 'src/app/services/product.service';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  actionName = '';
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: NgxSpinnerService, private _productService: ProductService
  ) { }


  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.actionName = this.data._id !== '' ? 'Edit' : 'Add';
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.data);
    if (this.data._id !== '') {
      const id = this.data._id;
      delete this.data._id;
      this.data.timestamp = getTimestampInSeconds();
      this._spinner.show();
      this._productService.updateProduct({ id }, this.data).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    } else {
      this._spinner.show();
      this.data.timestamp = getTimestampInSeconds();
      this._productService.createProduct(this.data).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    }
  }

}
