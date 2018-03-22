import { Component, OnInit, Input } from '@angular/core';
import { IPFSGetResponse } from '../../shared/Models/IPFS/IPFSGetResponse';

@Component({
  selector: 'submission-card',
  templateUrl: './submission-card.component.html',
  styleUrls: ['./submission-card.component.scss']
})
export class SubmissionCardComponent implements OnInit {
  @Input() SubmissionInfo: IPFSGetResponse;

  constructor() { }

  ngOnInit() {
  }

}
