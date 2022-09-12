import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';
import { AppStorage } from 'src/app/shared/app.storage';
import { AddSurveyComponent } from './add-survey/add-survey.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  displayedColumns = ['srn', 'question', 'actions'];
  dataSource: Survey[] = [];
  index: number = 0;
  id: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog, private _spinner: NgxSpinnerService,
    private _surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this._spinner.show();
    this.dataSource = [];
    this._surveyService.getSurvey().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        let lData = AppStorage.getItem('surveyQuestions') || [];
        if (lData.length < 3) {
          AppStorage.setItem('surveyQuestions', res.result.concat(lData));
        }
        this.dataSource = res.result.concat(lData);
        console.log(res.result, lData);
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddSurveyComponent, {
      data: new Survey()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

  startEdit(i: number, obj: Survey) {
    const dialogRef = this.dialogService.open(AddSurveyComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

  deleteItem(i: number, obj: Survey) {
    this._spinner.show();
    this._surveyService.deleteSurvey({ id: obj._id }).subscribe((res) => {
      this._spinner.hide();
      this.load();
    }, (err) => {
      this._spinner.hide();
    });
  }

}
