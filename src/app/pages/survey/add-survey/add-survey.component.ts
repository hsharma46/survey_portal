import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { QuestionType, Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {
  surveyForm: any;

  selectedOption: any = ['Multi choice'];

  editMode = false;
  surveyTypes = [
    { id: 0, value: 'Training' },
    { id: 1, value: 'HR' }
  ];


  questions: QuestionType[] = [
    { value: 'Single choice', viewValue: 'Single choice' },
    { value: 'Multi choice', viewValue: 'Multi choice' },
    { value: 'Text', viewValue: 'Text' },
    { value: 'Rating', viewValue: 'Rating' }
  ];

  constructor(public dialogRef: MatDialogRef<AddSurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: NgxSpinnerService, private _surveyService: SurveyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setQuestionGroup(index: any, question: any) {
    const questionTitle = question.questionTitle;
    const questionGroup = question.questionGroup.options;
    this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionTitle.value = questionTitle;
    questionGroup.forEach((element: any, i: any) => {
      this.addOption(index);
      this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options.controls[i].controls.optionText.value = element.optionText;
    });
  }

  onSubmit() {
  }

  public confirmAdd(): void {
    console.log(this.data);

    let formData = this.surveyForm.value;
    let surveyQuestions = formData.surveyQuestions;
    let optionArray = formData.surveyQuestions[0].questionGroup.options[0].optionText
    console.log(formData, surveyQuestions);

    if (this.data._id !== '') {
      this._spinner.show();
      let req: any = [];
      surveyQuestions.forEach((element: any) => {
        let data = new Survey();
        data['timestamp'] = getTimestampInSeconds().toString();
        data.questionGroup = element.questionGroup;
        data.questionTitle = element.questionTitle;
        data._id = getTimestampInSeconds().toString();
        req.push(data);
      });
      this._surveyService.createSurvey(req).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    } else {
      this._spinner.show();
      let req: any = [];
      surveyQuestions.forEach((element: any) => {
        let data = new Survey();
        data['timestamp'] = getTimestampInSeconds().toString();
        data.questionGroup = element.questionGroup;
        data.questionTitle = element.questionTitle;
        data._id = getTimestampInSeconds().toString();
        req.push(data);
      });
      this._surveyService.createSurvey(req).subscribe((res: ServerResponse) => {
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
      //'questionType': new FormControl('Multi choice', Validators.required),
      'questionGroup': new FormGroup({})
    });

    (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);

    const index = this.surveyForm.get('surveyQuestions').length > 0 ? this.surveyForm.get('surveyQuestions').length - 1 : 0;
    this.selectedOption.push('Multi choice');
    this.addOptionControls('Multi choice', index);
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
      this.addOptionControls(questionType, index)
    }
  }



  addOptionControls(questionType: any, index: any) {

    let options = new FormArray([]);
    (this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup).addControl('options', options);
    this.clearFormArray((<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options));

    if (this.data._id !== '') {
      this.setQuestionGroup(index, this.data);
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
    });
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options).push(optionGroup);
  }

  removeOption(questionIndex: any, itemIndex: any) {
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionGroup.controls.options).removeAt(itemIndex);
  }

}
