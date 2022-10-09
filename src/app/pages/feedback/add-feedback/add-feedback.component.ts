import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedbackComplete } from 'src/app/models/feedback';
import { ServerResponse } from 'src/app/models/server';
import { RegistrationDetails, SurveyComplete } from 'src/app/models/survey';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';
import { AppStorage } from 'src/app/shared/app.storage';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  questions: any[] = [];
  isSurveyStart = false;

  constructor(
    private _spinner: NgxSpinnerService, 
    private _questionService: QuestionService, 
    private _surveyService: SurveyService, 
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this._spinner.show();
    this._questionService.getQuestion().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.questions = this.transformQuestion(res.result);
      }
    });
  }

  submit() {
    let feedbackComplete = new FeedbackComplete();
    feedbackComplete.userDetails = AppStorage.getItem('SuerveyRegistrationDetails');
    feedbackComplete.feedbackDetails = this.questions;
    feedbackComplete.userId = AppStorage.getItem('UserData')._id;
    console.log(feedbackComplete);
    this._spinner.show();
    this._surveyService.createSurvey(feedbackComplete).subscribe((res: ServerResponse) => {
      this._spinner.hide();
      this.onBack();
    });
  }

  percentage(index: any, total: any) {
    return (index / total) * 100;
  }

  transformQuestion(questions: any) {
    let transformQuestion: any = [];
    questions.forEach((item: any) => {
      transformQuestion.push({
        _id: item._id,
        question: item.questionTitle,
        options: item.questionGroup.options,
        type: 'radio',
        answer: ''
      })
    })
    return transformQuestion;
  }


  onRegistrationFormSubmit(val: RegistrationDetails) {
    if (!!val) {
      AppStorage.setItem('SuerveyRegistrationDetails', val);
      this.isSurveyStart = true;
    }
  }

  onBack() {
    this._router.navigateByUrl('user/feedback');
  }


}
