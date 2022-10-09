import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  registrationForm: any;
  @Output('registrationFormSubmit') registrationFormSubmit = new EventEmitter<any>();
  constructor(private fb: FormBuilder, public _router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      userEmail: [
        null,
        Validators.compose([
          Validators.email
        ])
      ]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registrationFormSubmit.emit(this.registrationForm.value)
      console.log(this.registrationForm.value);
    }
  }


  getURL() {
    const router = this._router.url.split('/')[2]
    let route = '';
    if (router == 'survey') {
      route = 'Survey';
    }

    if (router == 'add-feedback') {
      route = 'Feedback';
    }
    return route;
  }
}
