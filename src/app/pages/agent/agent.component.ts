import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { Agent } from 'src/app/models/agent';
import { ServerResponse } from 'src/app/models/server';
import { AgentService } from 'src/app/services/agent.service';
import { AddAgentComponent } from './add-agent/add-agent.component';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  displayedColumns = ['srn', 'id', 'tablet', 'name', 'phone', 'field_office', 'team_code', 'supervisor_code', 'timestamp', 'email_id', 'status', 'actions'];
  dataSource:Agent[] = [];
  index: number = 0;
  id: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialogService: MatDialog,private _spinner: NgxSpinnerService, private _agentService: AgentService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this._spinner.show();
    this.dataSource = [];
    this._agentService.getAgent().subscribe((res: ServerResponse) => {
      this._spinner.hide();
      if (res.result.length > 0) {
        this.dataSource = res.result;
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddAgentComponent, {
      data: new Agent()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.load();
      }
    });
  }

  reload() {

  }

  startEdit(i: number, obj: Agent) {
    const dialogRef = this.dialogService.open(AddAgentComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, obj: Agent) {
    this._spinner.show();
    this._agentService.deleteAgent({ id: obj._id }).subscribe((res) => {
      this._spinner.hide();
      this.load();
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
