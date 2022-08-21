import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tablet } from 'src/app/models/tablet';

@Component({
  selector: 'app-add-tablet',
  templateUrl: './add-tablet.component.html',
  styleUrls: ['./add-tablet.component.scss']
})
export class AddTabletComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTabletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tablet) { }


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
    //this.dataService.addIssue(this.data);
  }


}
