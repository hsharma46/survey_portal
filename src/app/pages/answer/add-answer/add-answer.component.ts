import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Answer } from 'src/app/models/answer';
import { ServerResponse } from 'src/app/models/server';
import { QuestionType, Survey } from 'src/app/models/survey';
import { AnswerService } from 'src/app/services/answer.service';

import { getTimestampInSeconds } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit {

  surveyForm: any;

  selectedOption: any = ['Multi choice'];

  editMode = false;
  surveyTypes = [
    { id: 0, value: 'Training' },
    { id: 1, value: 'HR' }
  ];


  answers: QuestionType[] = [
    { value: 'Single choice', viewValue: 'Single choice' },
    { value: 'Multi choice', viewValue: 'Multi choice' },
    { value: 'Text', viewValue: 'Text' },
    { value: 'Rating', viewValue: 'Rating' }
  ];

  constructor(public dialogRef: MatDialogRef<AddAnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: NgxSpinnerService, private _answerService: AnswerService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setAnswerGroup(index: any, answer: any) {
    const answerTitle = answer.answerTitle;
    const answerGroup = answer.answerGroup.options;
    this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerTitle.value = answerTitle;
    answerGroup.forEach((element: any, i: any) => {
      this.addOption(index);
      this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerGroup.controls.options.controls[i].controls.optionText.value = element.optionText;
      this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerGroup.controls.options.controls[i].controls.optionValue.value = element.optionValue;
    });
  }

  onSubmit() {
  }

  public confirmAdd(): void {
    let formData = this.surveyForm.value;
    let surveyAnswers = formData.surveyAnswers;
    let optionArray = formData.surveyAnswers[0].answerGroup.options[0].optionText
    console.log(formData, surveyAnswers);

    if (this.data._id !== '') {
      this._spinner.show();
      let req: any = [];
      surveyAnswers.forEach((element: any) => {
        let data = new Answer();
        data['timestamp'] = getTimestampInSeconds();
        data.answerGroup = element.answerGroup;
        data.answerTitle = element.answerTitle;
        data._id = this.data._id;
        delete data._id;
        req.push(data);
      });
      this._answerService.updateAnswer({ id: this.data._id }, req[0]).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      }, () => {
        this._spinner.hide();
      });
    } else {
      this._spinner.show();
      let req: any = [];
      surveyAnswers.forEach((element: any) => {
        let data = new Answer();
        data['timestamp'] = getTimestampInSeconds();
        data.answerGroup = element.answerGroup;
        data.answerTitle = element.answerTitle;
        req.push(data);
      });
      this._answerService.createAnswer(req).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      }, () => {
        this._spinner.hide();
      });
    }
  }


  private initForm() {
    let surveyAnswers: any = new FormArray([]);
    this.surveyForm = new FormGroup({
      'surveyAnswers': surveyAnswers
    });
    this.onAddAnswer();
  }

  onAddAnswer() {

    const surveyAnswerItem = new FormGroup({
      'answerTitle': new FormControl('', Validators.required),
      //'answerType': new FormControl('Multi choice', Validators.required),
      'answerGroup': new FormGroup({})
    });

    (<FormArray>this.surveyForm.get('surveyAnswers')).push(surveyAnswerItem);

    const index = this.surveyForm.get('surveyAnswers').length > 0 ? this.surveyForm.get('surveyAnswers').length - 1 : 0;
    this.selectedOption.push('Multi choice');
    this.addOptionControls('Multi choice', index);
  }

  onRemoveAnswer(index: any) {
    this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerGroup = new FormGroup({});
    //this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerType = new FormControl({});
    (<FormArray>this.surveyForm.get('surveyAnswers')).removeAt(index);
    this.selectedOption.splice(index, 1);
    console.log(this.surveyForm);
  }


  onSeletAnswerType(answerType: any, index: any) {
    if (answerType === 'Single choice' || answerType === 'Multi choice') {
      this.addOptionControls(answerType, index)
    }
  }



  addOptionControls(answerType: any, index: any) {

    let options = new FormArray([]);
    (this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerGroup).addControl('options', options);
    this.clearFormArray((<FormArray>this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerGroup.controls.options));

    if (this.data._id !== '') {
      this.setAnswerGroup(index, this.data);
    } else {
      this.addOption(index);
      this.addOption(index);
    }
  }


  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


  addOption(index: any) {
    const optionGroup = new FormGroup({
      'optionText': new FormControl('', Validators.required),
      'optionValue': new FormControl('', Validators.required),
    });
    (<FormArray>this.surveyForm.controls.surveyAnswers['controls'][index].controls.answerGroup.controls.options).push(optionGroup);
  }

  removeOption(answerIndex: any, itemIndex: any) {
    (<FormArray>this.surveyForm.controls.surveyAnswers['controls'][answerIndex].controls.answerGroup.controls.options).removeAt(itemIndex);
  }


}
