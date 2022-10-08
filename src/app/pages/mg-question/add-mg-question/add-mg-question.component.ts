import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Answer } from 'src/app/models/answer';
import { ServerResponse } from 'src/app/models/server';
import { QuestionType, Survey } from 'src/app/models/survey';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
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


  questions: QuestionType[] = [
    { value: 'Single choice', viewValue: 'Single choice' },
    { value: 'Multi choice', viewValue: 'Multi choice' },
    { value: 'Text', viewValue: 'Text' },
    { value: 'Rating', viewValue: 'Rating' }
  ];

  constructor(public dialogRef: MatDialogRef<AddMgQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: NgxSpinnerService,
    private _questionService: QuestionService,
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
    const questionGroup = question.questionGroup.options;
    this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionTitle.value = questionTitle;
  }

  onSubmit() {
  }

  public confirmAdd(): void {
    let formData = this.surveyForm.value;
    let surveyQuestions = formData.surveyQuestions;
    let optionArray = formData.surveyQuestions[0].questionGroup.options[0].optionText
    console.log(formData, surveyQuestions);

    if (this.data._id !== '') {
      this._spinner.show();
      let req: any = [];
      surveyQuestions.forEach((element: any) => {
        let data = new Survey();
        data['timestamp'] = getTimestampInSeconds();
        data.questionGroup = element.questionGroup;
        data.questionTitle = element.questionTitle;
        data._id = this.data._id;
        delete data._id;
        req.push(data);
      });
      this._questionService.updateQuestion({ id: this.data._id }, req[0]).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    } else {
      this._spinner.show();
      let req: any = [];
      surveyQuestions.forEach((element: any) => {
        let data = new Survey();
        data['timestamp'] = getTimestampInSeconds();
        data.questionGroup = element.questionGroup;
        data.questionTitle = element.questionTitle;
        req.push(data);
      });
      this._questionService.createQuestion(req).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    }
  }


  private initForm() {
    let surveyQuestions: any = new FormArray([]);
    this.surveyForm = new FormGroup({
      'surveyQuestions': surveyQuestions
    });
    this.onAddQuestion();
  }

  onAddQuestion() {

    const surveyQuestionItem = new FormGroup({
      'questionTitle': new FormControl('', Validators.required),
      'questionType': new FormControl('', Validators.required),
      //'questionGroup': new FormGroup({})
    });

    (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);

    const index = this.surveyForm.get('surveyQuestions').length > 0 ? this.surveyForm.get('surveyQuestions').length - 1 : 0;
    this.selectedOption.push('Multi choice');
    //this.addOptionControls('Multi choice', index);
  }

  onRemoveQuestion(index: any) {
    this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup = new FormGroup({});
    //this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionType = new FormControl({});
    (<FormArray>this.surveyForm.get('surveyQuestions')).removeAt(index);
    this.selectedOption.splice(index, 1);
    console.log(this.surveyForm);
  }


  onSeletQuestionType(questionType: any, index: any) {
    if (questionType === 'Single choice' || questionType === 'Multi choice') {
      //this.addOptionControls(questionType, index)
    }
  }


  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
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
