import { Component, OnInit, Input } from '@angular/core';
import { IPFSGetResponse } from '../../shared/Models/IPFS/IPFSGetResponse';

@Component({
  selector: 'submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
  @Input() Submissions: IPFSGetResponse[];

  constructor() { }

  ngOnInit() {
  }

}
