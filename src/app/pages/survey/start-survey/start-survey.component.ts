import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { QuestionService } from 'src/app/services/question.service';


@Component({
  selector: 'app-start-survey',
  templateUrl: './start-survey.component.html',
  styleUrls: ['./start-survey.component.scss']
})
export class StartSurveyComponent implements OnInit {

  questions: any[] = [];

  constructor(private _spinner: NgxSpinnerService, private _questionService: QuestionService) { }

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
    console.log(this.questions);
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
}
