import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from 'src/app/pages/agent/agent.component';
import { AnswerComponent } from 'src/app/pages/answer/answer.component';
import { AddFeedbackComponent } from 'src/app/pages/feedback/add-feedback/add-feedback.component';
import { FeedbackComponent } from 'src/app/pages/feedback/feedback.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MgQuestionComponent } from 'src/app/pages/mg-question/mg-question.component';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { QuestionComponent } from 'src/app/pages/question/question.component';
import { StartSurveyComponent } from 'src/app/pages/survey/start-survey/start-survey.component';
import { SurveyListComponent } from 'src/app/pages/survey/survey-list/survey-list.component';
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
      { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
      { path: 'survey', component: StartSurveyComponent, canActivate: [AuthGuard] },
      { path: 'survey-list', component: SurveyListComponent, canActivate: [AuthGuard] },
      { path: 'answer', component: AnswerComponent, canActivate: [AuthGuard] },
      { path: 'mq-question', component: MgQuestionComponent, canActivate: [AuthGuard] },
      { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
      { path: 'add-feedback', component: AddFeedbackComponent, canActivate: [AuthGuard] },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
