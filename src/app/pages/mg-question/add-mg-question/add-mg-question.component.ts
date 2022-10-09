import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Answer } from 'src/app/models/answer';
import { MQQuestion } from 'src/app/models/question';
import { ServerResponse } from 'src/app/models/server';
import { AnswerService } from 'src/app/services/answer.service';
import { MQQuestionService } from 'src/app/services/mq-question.service';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';
import { AddAnswerComponent } from '../../answer/add-answer/add-answer.component';

@Component({
  selector: 'app-add-mg-question',
  templateUrl: './add-mg-question.component.html',
  styleUrls: ['./add-mg-question.component.scss']
})
export class AddMgQuestionComponent implements OnInit {

  surveyForm: any;

  selectedOption: any = ['Multi choice'];

  editMode = false;
  surveyTypes = [
    { id: 0, value: 'Training' },
    { id: 1, value: 'HR' }
  ];

  answerDataSource: Answer[] = [];

  constructor(public dialogRef: MatDialogRef<AddMgQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: NgxSpinnerService,
    private _mqquestionService: MQQuestionService,
    public dialogService: MatDialog,
    private _answerService: AnswerService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.load();
    this.initForm();
  }

  load() {
    this._spinner.show();
    this.answerDataSource = [];
    this._answerService.getAnswer().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.answerDataSource = res.result;
      }
    }, () => {
      this._spinner.hide();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setQuestionGroup(index: any, question: any) {
    const questionTitle = question.questionTitle;
    const answerType = question.answerType;
    this.surveyForm.controls.mqQuestions['controls'][index].controls.questionTitle.value = questionTitle;
    this.surveyForm.controls.mqQuestions['controls'][index].controls.answerType.value = answerType;
  }

  onSubmit() {
  }

  public confirmAdd(): void {
    let formData = this.surveyForm.value;
    let mqQuestions = formData.mqQuestions;
    if (this.data._id !== '') {
      this._spinner.show();
      let req: any = [];
      mqQuestions.forEach((element: any) => {
        let data = new MQQuestion();
        data['timestamp'] = getTimestampInSeconds();
        data.answer_id = element.answerType;
        data.questionTitle = element.questionTitle;
        data._id = this.data._id;
        delete data._id;
        req.push(data);
      });
      this._mqquestionService.updateQuestion({ id: this.data._id }, req[0]).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      }, () => {
        this._spinner.hide();
      });
    } else {
      this._spinner.show();
      let req: any = [];
      mqQuestions.forEach((element: any) => {
        let data = new MQQuestion();
        data['timestamp'] = getTimestampInSeconds();
        data.answer_id = element.answerType;
        data.questionTitle = element.questionTitle;
        req.push(data);
      });
      this._mqquestionService.createQuestion(req).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      }, () => {
        this._spinner.hide();
      });
    }
  }


  private initForm() {
    let mqQuestions: any = new FormArray([]);
    this.surveyForm = new FormGroup({
      'mqQuestions': mqQuestions
    });
    this.onAddQuestion();
  }

  onAddQuestion() {
    const surveyQuestionItem = new FormGroup({
      'questionTitle': new FormControl('', Validators.required),
      'answerType': new FormControl('', Validators.required),
      //'questionGroup': new FormGroup({})
    });
    (<FormArray>this.surveyForm.get('mqQuestions')).push(surveyQuestionItem);
    const index = this.surveyForm.get('mqQuestions').length > 0 ? this.surveyForm.get('mqQuestions').length - 1 : 0;
    this.selectedOption.push('Multi choice');

    if (this.data._id !== '') {
      this.setQuestionGroup(index, this.data);
    }

  }

  onRemoveQuestion(index: any) {
    this.surveyForm.controls.mqQuestions['controls'][index].controls.questionGroup = new FormGroup({});
    //this.surveyForm.controls.mqQuestions['controls'][index].controls.answerType = new FormControl({});
    (<FormArray>this.surveyForm.get('mqQuestions')).removeAt(index);
    this.selectedOption.splice(index, 1);
    console.log(this.surveyForm);
  }


  onSeletQuestionType(answerType: any, index: any) {
    if (answerType === 'Single choice' || answerType === 'Multi choice') {
      //this.addOptionControls(answerType, index)
    }
  }

  openAddDialog() {
    const data = new Answer();
    const dialogRef = this.dialogService.open(AddAnswerComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

}
