// Angular Imports
import { Component, Inject, OnInit } from '@angular/core';
// App-specific imports
import { SubmissionService } from '../shared/services/submission/submission.service';
import { AppInfo } from '../shared/Models/Appinfo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  appInfo: AppInfo;

  constructor( private _submissionService: SubmissionService) {
      
  }

  async ngOnInit() {
     this.appInfo = await this._submissionService.getAppInfo();
  }
}


