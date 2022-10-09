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

  getURL(action: any) {
    const router = this._router.url.split('/')[2]
    let route = '';
    if (action == 'survey') {
      if (router == 'survey') {
        route = 'survey';
      } else {
        route = 'survey-list'
      }
    }

    if (action == 'feedback') {
      if (router == 'add-feedback') {
        route = 'add-feedback';
      } else {
        route = 'feedback'
      }
    }


    return route;
  }



}
