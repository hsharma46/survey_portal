import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppShared } from 'src/app/shared/app.shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public _router: Router, private appShared: AppShared) { }

  ngOnInit(): void {
    this._router.url
    console.log(this._router.url.split('/')[2]);
  }

  onLogout() {
    this.appShared.showConfirm('Are you sure you want to logout?', ['Sure', 'Cancel']).subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.clear();
        this._router.navigate(['/login']);
      }
    })
  }

  getURL(router: any) {
    let route = 'survey';
    if (router == 'survey-list') {
      route = 'survey-list';
    } else {
      route = 'survey'
    }
    return route;
  }



}
