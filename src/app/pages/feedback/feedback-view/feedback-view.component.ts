import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.scss']
})
export class FeedbackViewComponent implements OnInit {

  feedbackDatasource: any = null;
  constructor(
    private _spinner: NgxSpinnerService,
    private _feedbackService: FeedbackService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this._spinner.show();
    this._feedbackService.getFeedbackDetails({ _id: this.data._id }).subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (!!res.result) {
        this.feedbackDatasource = res.result;
      }
    }, () => {
      this._spinner.hide();
    });
  }

}
