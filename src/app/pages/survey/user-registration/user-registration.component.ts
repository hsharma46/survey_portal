import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  registrationForm: any;
  @Output('registrationFormSubmit') registrationFormSubmit = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ["a", Validators.required],
      lastName: ["a", Validators.required],
      address: ["a", Validators.required],
      city: ["a", Validators.required],
      state: ["a", Validators.required],
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
}
