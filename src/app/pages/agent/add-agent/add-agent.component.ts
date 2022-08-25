import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponse } from 'src/app/models/server';
import { Tablet } from 'src/app/models/tablet';
import { AgentService } from 'src/app/services/agent.service';
import { TabletService } from 'src/app/services/tablet.service';
import { getTimestampInSeconds } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  actionName = '';
  datasourceTablet: Tablet[] = [];
  constructor(public dialogRef: MatDialogRef<AddAgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: NgxSpinnerService, private _agentService: AgentService,private _tabletService: TabletService
    ) { }


  formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {
    this.actionName = this.data._id !== '' ? 'Edit' : 'Add';
    this.loadTablet();
  }

  loadTablet() {
    this.datasourceTablet = [];
    this._spinner.show();
    this._tabletService.getTablet().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.datasourceTablet = res.result;
      }
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.data);
    if (this.data._id !== '') {
      const id = this.data._id;
      delete this.data._id;
      this._spinner.show();
      this.data.timestamp = getTimestampInSeconds();
      this._agentService.updateAgent({ id }, this.data).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    } else {
      this._spinner.show();
      this.data.timestamp = getTimestampInSeconds();
      this._agentService.createAgent(this.data).subscribe((res: ServerResponse) => {
        this._spinner.hide();
        this.dialogRef.close(1);
      });
    }
  }

}
