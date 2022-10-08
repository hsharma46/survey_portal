import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { Answer } from 'src/app/models/answer';
import { ServerResponse } from 'src/app/models/server';
import { AnswerService } from 'src/app/services/answer.service';
import { AddAnswerComponent } from './add-answer/add-answer.component';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  displayedColumns = ['srn', 'answer', 'actions'];
  dataSource: Answer[] = [];
  index: number = 0;
  id: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog, private _spinner: NgxSpinnerService,
    private _answerService: AnswerService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this._spinner.show();
    this.dataSource = [];
    this._answerService.getAnswer().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.dataSource = res.result;
      }
    }, () => {
      this._spinner.hide();
    });
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddAnswerComponent, {
      data: new Answer()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

  startEdit(i: number, obj: Answer) {
    const dialogRef = this.dialogService.open(AddAnswerComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

  deleteItem(i: number, obj: Answer) {
    this._spinner.show();
    this._answerService.deleteAnswer({ id: obj._id }).subscribe((res) => {
      this._spinner.hide();
      this.load();
    }, (err) => {
      this._spinner.hide();
    });
  }

}
