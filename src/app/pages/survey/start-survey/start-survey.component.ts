import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { RegistrationDetails, SurveyComplete } from 'src/app/models/survey';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';
import { AppStorage } from 'src/app/shared/app.storage';


@Component({
  selector: 'app-start-survey',
  templateUrl: './start-survey.component.html',
  styleUrls: ['./start-survey.component.scss']
})
export class StartSurveyComponent implements OnInit {


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
    let surveyComplete = new SurveyComplete();
    surveyComplete.userDetails = AppStorage.getItem('SuerveyRegistrationDetails');
    surveyComplete.surveyDetails = this.questions;
    surveyComplete.userId = AppStorage.getItem('UserData')._id;
    console.log(surveyComplete);
    this._spinner.show();
    this._surveyService.createSurvey(surveyComplete).subscribe((res: ServerResponse) => {
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
    this._router.navigateByUrl('user/survey-list');
  }

}
