import { Component, OnInit } from '@angular/core';
import { IPFSService } from '../../shared/services/IPFS/ipfs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubmissionResponse } from '../../shared/Models/Ethereum/SubmissionResponse';
import { SubmissionRequest } from '../../shared/Models/Ethereum/SubmissionRequest';
import { SubmissionService } from '../../shared/services/submission/submission.service';
import { IPFSGetResponse } from '../../shared/Models/IPFS/IPFSGetResponse';

@Component({
  selector: 'app-view-submission',
  templateUrl: './view-submission.component.html',
  styleUrls: ['./view-submission.component.css']
})
export class ViewSubmissionComponent implements OnInit {
  _formGroup: FormGroup;
  Submissions: IPFSGetResponse[];

  constructor(private _submissionService: SubmissionService) {
       this.Submissions = [];
   }

  ngOnInit() {
      this._formGroup = new FormGroup({
          submissionId: new FormControl('',{ validators: [Validators.required, Validators.pattern('^[0-9]*$')] })
      });
  }

  async viewMemory(event:any) {
      const request: SubmissionRequest = new SubmissionRequest();
      request.submisionId = +this._formGroup.get('submissionId').value;
      let response: IPFSGetResponse = await this._submissionService.getSubmission(request);
      this.Submissions.length = 0;
      this.Submissions.push(response);
  }

  isValid(): boolean {
      return this._formGroup.valid;
  }

}
