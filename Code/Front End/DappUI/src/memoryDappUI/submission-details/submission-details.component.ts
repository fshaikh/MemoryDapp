import { Component, OnInit, Input } from '@angular/core';
import { TransactionResponse } from '../../shared/Models/Ethereum/TransactionResponse';
import { MemoryContractTransactionResponse } from '../../shared/Models/Ethereum/MemoryContractTransactionResponse';

@Component({
  selector: 'submission-details',
  templateUrl: './submission-details.component.html',
  styleUrls: ['./submission-details.component.css']
})
export class SubmissionDetailsComponent implements OnInit {
  @Input() TxResponse : MemoryContractTransactionResponse;

  constructor() { }

  ngOnInit() {
    
  }

}
