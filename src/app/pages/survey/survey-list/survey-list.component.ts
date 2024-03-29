import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { SurveyList } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveyViewComponent } from '../survey-view/survey-view.component';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  displayedColumns = ['srn','code', 'user', 'agent', 'actions'];
  dataSource: SurveyList[] = [];
  index: number = 0;
  id: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog, private _spinner: NgxSpinnerService,
    private _surveyService: SurveyService, private router: Router
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
        this.dataSource = res.result;
      }
    }, () => {
      this._spinner.hide();
    });
  }

  openAddDialog() {
    this.router.navigateByUrl('user/survey');
  }

  startEdit(i: number, obj: SurveyList) {
    const dialogRef = this.dialogService.open(SurveyViewComponent, {
      data: obj,
      //width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

  deleteItem(i: number, obj: SurveyList) {
    this._spinner.show();
    this._surveyService.deleteSurvey({ id: obj._id }).subscribe((res) => {
      this._spinner.hide();
      this.load();
    }, (err) => {
      this._spinner.hide();
    });
  }

}
