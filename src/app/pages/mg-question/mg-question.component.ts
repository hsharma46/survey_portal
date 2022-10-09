import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { Survey } from 'src/app/models/survey';
import { MQQuestionService } from 'src/app/services/mq-question.service';
import { AddMgQuestionComponent } from './add-mg-question/add-mg-question.component';

@Component({
  selector: 'app-mg-question',
  templateUrl: './mg-question.component.html',
  styleUrls: ['./mg-question.component.scss']
})
export class MgQuestionComponent implements OnInit {

  displayedColumns = ['srn', 'question', 'actions'];
  dataSource: Survey[] = [];
  index: number = 0;
  id: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog, private _spinner: NgxSpinnerService,
    private _mqquestionService: MQQuestionService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this._spinner.show();
    this.dataSource = [];
    this._mqquestionService.getQuestion().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.dataSource = res.result;
      }
    }, () => {
      this._spinner.hide();
    });
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddMgQuestionComponent, {
      data: new Survey()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

  startEdit(i: number, obj: Survey) {
    const dialogRef = this.dialogService.open(AddMgQuestionComponent, {
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
    this._mqquestionService.deleteQuestion({ id: obj._id }).subscribe((res) => {
      this._spinner.hide();
      this.load();
    }, (err) => {
      this._spinner.hide();
    });
  }

}
