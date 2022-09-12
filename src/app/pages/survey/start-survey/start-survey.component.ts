import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppStorage } from 'src/app/shared/app.storage';

const surveys = [{
  id: 1,
  questions: [{
    question: 'On the scale of 1 to 10, what would you rate this course?',
    options: [
      { value: 10, label: 10 },
      { value: 9, label: 9 },
      { value: 8, label: 8 },
      { value: 7, label: 7 },
      { value: 6, label: 6 },
      { value: 5, label: 5 },
      { value: 4, label: 4 },
      { value: 3, label: 3 },
      { value: 2, label: 2 },
      { value: 1, label: 1 },
    ],
    type: 'radio',
  }, {
    question: 'What do you like the most about this course?',
    type: 'text'
  }, {
    question: 'What did you learn from this course that you didn\'t know before?',
    options: [
      { value: "angular", label: "Angular" },
      { value: "cli", label: "Angular CLI" },
      { value: "pwa", label: "Progressive Web Apps" },
      { value: "spa", label: "Single Page Application using Anuglar" },
      { value: "ssr", lable: "Server Side Rendering using Angular Universal" },
      { value: "monorepo", label: "Creating Mono Repo App using Nx" }
    ]
  }, {
    question: 'Whats your feedback about the course?',
    type: 'text'
  }]
}]

@Component({
  selector: 'app-start-survey',
  templateUrl: './start-survey.component.html',
  styleUrls: ['./start-survey.component.scss']
})
export class StartSurveyComponent implements OnInit {

  questions: any[];

  constructor() { }

  ngOnInit(): void {
    let lData = AppStorage.getItem('surveyQuestions') || [];
    let question: any = [];
    lData.forEach((item: any) => {
      question.push({
        _id: item._id,
        question: item.questionTitle,
        options: item.questionGroup.options,
        type: 'radio',
        answer: ''
      })
    });
    this.questions = question;
  }

  submit() {
    console.log(this.questions);
  }

  percentage(index: any, total: any) {
    return (index / total) * 100;
  }

}
