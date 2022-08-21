import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
