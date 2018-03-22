import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../../shared/services/submission/submission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IPFSGetResponse } from '../../shared/Models/IPFS/IPFSGetResponse';
import { LatestSubmissionsRouteResolver } from './latest-submissions-routeresolver';
import { RecentSubmissionsRequest } from '../../shared/Models/RecentSubmissionsRequest';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './latest-submissions.component.html',
  styleUrls: ['./latest-submissions.component.css']
  
})
export class LatestSubmissionsComponent implements OnInit {
  LatestSubmissions: IPFSGetResponse[];
  constructor(private _route:ActivatedRoute, private _submissionService: SubmissionService) { }

  async ngOnInit() {
    // this._route.data.subscribe(
    //   data => { 
    //     this.LatestSubmissions = data['latest'];
    //   }
    // );
    let request: RecentSubmissionsRequest = new RecentSubmissionsRequest();
    request.fetchCount = environment.fetchCount;
    this.LatestSubmissions = await this._submissionService.getRecentSubmissions(request);
  }
}
