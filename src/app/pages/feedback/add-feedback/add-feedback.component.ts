import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedbackComplete } from 'src/app/models/feedback';
import { ServerResponse } from 'src/app/models/server';
import { RegistrationDetails, SurveyComplete } from 'src/app/models/survey';
import { AnswerService } from 'src/app/services/answer.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { MQQuestionService } from 'src/app/services/mq-question.service';
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
    private _mqquestionService: MQQuestionService,
    private _answerService: AnswerService,
    private _feedbackService: FeedbackService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
   
    let httpRequest = [];
    const req1 = this._mqquestionService.getQuestion();
    const req2 = this._answerService.getAnswer();
    httpRequest.push(req1);
    httpRequest.push(req2);
    this._spinner.show();
    this._feedbackService.requestDataFromMultipleSources(httpRequest).subscribe((responseList) => {
      this._spinner.hide();
      if (responseList.length > 0) {
        console.log(responseList);
        var qus = responseList[0].result;
        var ans = responseList[1].result;
        this.questions = this.transformMQQuestion(qus, ans);
      }
    }, () => {
      this._spinner.hide();
    });
  }

  submit() {
    let feedbackComplete = new FeedbackComplete();
    feedbackComplete.userDetails = AppStorage.getItem('SuerveyRegistrationDetails');
    feedbackComplete.feedbackDetails = this.questions;
    feedbackComplete.userId = AppStorage.getItem('UserData')._id;
    console.log(feedbackComplete);
    this._spinner.show();
    this._feedbackService.createFeedback(feedbackComplete).subscribe((res: ServerResponse) => {
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


  transformMQQuestion(qus: any, ans: any) {
    let questionList: any = [];
    qus.forEach((element: any) => {
      let _options = ans.find((ele: any) => { return (element.answerId == ele._id) });
      element['questionGroup'] = _options.answerGroup;
      questionList.push(element);
    });
    return this.transformQuestion(questionList);
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
