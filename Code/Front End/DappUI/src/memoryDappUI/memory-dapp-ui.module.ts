// Import angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

import {SharedModule} from '../shared/shared.module';

// import components
import { SubmitComponent } from './submit/submit.component';
import { InfoComponent } from './info/info.component';
import { SubmissionDetailsComponent } from './submission-details/submission-details.component';
import { ViewSubmissionComponent } from './view-submission/view-submission.component';
import { SubmissionCardComponent } from './submission-card/submission-card.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { LatestSubmissionsComponent } from './latest-submissions/latest-submissions.component';
//import { LatestSubmissionsRouteResolver } from './latest-submissions/latest-submissions-routeresolver';


// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'submit',component: SubmitComponent },
  {  path: 'info', component: InfoComponent },
  {  path: 'details', component: SubmissionDetailsComponent },
  {  path: 'view'   , component: ViewSubmissionComponent },
  {  path: 'latest'   , component: LatestSubmissionsComponent }
  //{  path: 'latest'   ,resolve: { latest : LatestSubmissionsRouteResolver }, component: LatestSubmissionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    SubmitComponent,
    InfoComponent,
    SubmissionDetailsComponent,
    ViewSubmissionComponent,
    SubmissionsComponent,
    SubmissionCardComponent,
    LatestSubmissionsComponent
  ]
})
export class MemoryDappUiModule { }
