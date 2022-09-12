import { Component } from '@angular/core';
import { AppStorage } from './shared/app.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularApp';


  ngOnInit(): void {
    AppStorage.setItem('surveyQuestions', []);
  }
}
