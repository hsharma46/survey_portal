import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  constructor(
    private _snackBar: MatSnackBar,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.userName == "" || this.password == "") {
      this.openSnackBar("Please enter required fields", 'Remove')
      return;
    }
    this._spinner.show();
    this._loginService.onLogin({ username: this.userName, password: this.password }).subscribe((res) => {
      this._spinner.hide();
      console.log(res);
      localStorage.setItem('UserData', JSON.stringify(res.result[0]));
      this._router.navigate(['/home']);
    }, (err) => {
      this._spinner.hide();
    })
    console.log(this.userName, this.password);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }

}
