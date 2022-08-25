import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppShared } from 'src/app/shared/app.shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private _router: Router, private appShared: AppShared) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.appShared.showConfirm('Are you sure you want to logout?', ['Sure', 'Cancel']).subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.clear();
        this._router.navigate(['/login']);
      }
    })
  }

}
