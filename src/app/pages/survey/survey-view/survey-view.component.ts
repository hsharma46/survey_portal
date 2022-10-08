import { Component, OnInit } from '@angular/core';
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
    private _surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this._spinner.show();
    this._surveyService.getSurveyDetails().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.surveyDatasource = res.result[0];
        console.log(this.surveyDatasource);
      }
    });
  }

}
