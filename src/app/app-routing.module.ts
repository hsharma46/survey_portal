import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavModule } from './components/sidenav/sidenav.module';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';


/*
const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];
*/

const routes: Routes = [{
  path: '',
  loadChildren: () =>
    import('./pages/login/login.module').then(
      m => m.LoginModule
    )
},
{
  path: 'user', loadChildren: () =>
  import('./components/sidenav/sidenav.module').then(
    m => m.SidenavModule
  )
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SidenavModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
