import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { Tablet } from 'src/app/models/tablet';
import { ProductService } from 'src/app/services/product.service';
import { TabletService } from 'src/app/services/tablet.service';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-add-tablet',
  templateUrl: './add-tablet.component.html',
  styleUrls: ['./add-tablet.component.scss']
})
export class AddTabletComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTabletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: NgxSpinnerService, private _tabletService: TabletService
    ) { }


  formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {
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
      this._tabletService.updateTablet({ id }, this.data).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    } else {
      this._spinner.show();
      this.data.timestamp = getTimestampInSeconds();
      this._tabletService.createTablet(this.data).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    }
  }


}
