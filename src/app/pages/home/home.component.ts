import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails: any;

  constructor(
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('UserData');
    this.userDetails = JSON.parse(data);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }

  onLogout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
