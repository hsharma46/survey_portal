import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { SurveyComplete } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.scss']
})
export class SurveyViewComponent implements OnInit {

  surveyDatasource: any = null;
  constructor(
    private _spinner: NgxSpinnerService,
    private _surveyService: SurveyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this._spinner.show();
    this._surveyService.getSurveyDetails({ _id: this.data._id }).subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (!!res.result) {
        this.surveyDatasource = res.result;
        console.log(this.surveyDatasource);
      }
    }, () => {
      this._spinner.hide();
    });
  }

}
