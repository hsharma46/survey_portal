import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from 'src/app/pages/agent/agent.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { StartSurveyComponent } from 'src/app/pages/survey/start-survey/start-survey.component';
import { SurveyComponent } from 'src/app/pages/survey/survey.component';
import { TabletComponent } from 'src/app/pages/tablet/tablet.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { SidenavComponent } from './sidenav.component';


const routes: Routes = [
  {
    path: 'user', component: SidenavComponent, children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
      { path: 'agent', component: AgentComponent, canActivate: [AuthGuard] },
      { path: 'tablet', component: TabletComponent, canActivate: [AuthGuard] },
      { path: 'question', component: SurveyComponent, canActivate: [AuthGuard] },
      { path: 'survey', component: StartSurveyComponent, canActivate: [AuthGuard] },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
