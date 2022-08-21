import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AngularMaterialModule
  ]
})
export class LoginModule { }
