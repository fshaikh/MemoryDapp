import { Component, OnInit } from '@angular/core';
import { AppInfo } from '../../shared/Models/Appinfo';
import { SubmissionService } from '../../shared/services/submission/submission.service';

@Component({
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  appInfo: AppInfo;
  constructor(private _submissionService:SubmissionService) { }

  async ngOnInit() {
      this.appInfo = await this._submissionService.getAppInfo();
  }
}
