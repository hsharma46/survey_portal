import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SidenavRoutingModule } from './sidenav-routing.module';
/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductComponent } from 'src/app/pages/product/product.component';
import { AddProductComponent } from 'src/app/pages/product/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabletComponent } from 'src/app/pages/tablet/tablet.component';
import { AddTabletComponent } from 'src/app/pages/tablet/add-tablet/add-tablet.component';
import { AgentComponent } from 'src/app/pages/agent/agent.component';
import { AddAgentComponent } from 'src/app/pages/agent/add-agent/add-agent.component';


@NgModule({
  declarations: [
    SidenavComponent,
    HomeComponent,
    ProductComponent,
    AddProductComponent,
    TabletComponent,
    AddTabletComponent,
    AgentComponent,
    AddAgentComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SidenavRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SidenavModule { }
