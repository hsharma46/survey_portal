import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from 'src/app/pages/agent/agent.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { TabletComponent } from 'src/app/pages/tablet/tablet.component';
import { SidenavComponent } from './sidenav.component';


const routes: Routes = [
  {
    path: 'user', component: SidenavComponent, children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'dashboard', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'agent', component: AgentComponent },
      { path: 'tablet', component: TabletComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
