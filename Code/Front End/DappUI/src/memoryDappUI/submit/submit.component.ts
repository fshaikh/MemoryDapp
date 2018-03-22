import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { MemoryInfo } from '../../shared/Models/MemoryInfo';
import { IPFSAddRequest } from '../../shared/Models/IPFS/IPFSAddRequest';
import { INotificationProvider } from '../../shared/services/notification/INotificationProvider';
import { NotificationMessage } from '../../shared/Models/Notification/NotificationMessage';
import { IPFSAddResponse } from '../../shared/Models/IPFS/IPFSAddResponse';
import { TransactionReceipt, TransactionResponse } from '../../shared/Models/Ethereum/TransactionResponse';
import { SubmissionService } from '../../shared/services/submission/submission.service';

@Component({
  selector: 'memory-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {
  // Form Builder for constructing the form model
  public formGroup: FormGroup;
  // Object to hold all validation messages
  private _validationMessages: any = {
     required: 'Value must be entered'
  };
  // Variables that hold the validation message for a field
  // Name
  public nameValidationMessage: string = '';
  // Title
  private titleValidationMessage: string = '';
  // Data
  private dataValidationMessage: string = '';

  TxResponse: TransactionResponse;

  /**
   * Initialzes a new instance of SubmitComponent
   * @param _ipfsService IPFSService
   * @param _web3Provider Web3Provider
   */
  constructor(private _submissionService: SubmissionService,
              @Inject('INotificationProvider') private _notificationProvider: INotificationProvider,
              private _router: Router) {

  }

  ngOnInit() {
      // Construct the form group
      this.constructFormGroup();

      // listen for value changes for all fields. When the value changes, set the validation message
      const nameControl = this.getFormControl('name');
      nameControl.valueChanges.subscribe(value => this.setNameValidationMessage(nameControl));
  }

  public getSubmissionPrice(): string {
     return `${this._submissionService.getSubmissionPrice()} ETH`;
  }

  /**
   * Event handler for Submit Memory button
   */
  // async submitMemory() {
  //   // Validate the data
  //   // Create the IPFS request
  //   const ipfsRequest: IPFSAddRequest = this.getIPFSRequest();
  //   // Save to IPFS first
  //   const ipfsResponse = await this._ipfsService.addData(ipfsRequest);
  //   if(ipfsResponse.isSuccess){
  //     // show successful notification
  //     this.showIPFSSuccessNotification(ipfsResponse);
  //     // Save to blockchain 
  //     const transactionResponse = await this.saveToBlockchain(ipfsResponse);
  //     if(transactionResponse.isSuccess) {
  //       this.showBlockchainSuccessNotification(transactionResponse);
  //       this.TxResponse = transactionResponse;
  //     }
  //   } else {
  //      // TODO: show error notification
  //   }
  // }

  async submitMemory() {
      // Create the IPFS request
      const ipfsRequest: IPFSAddRequest = this.getIPFSRequest();
      const response = await this._submissionService.addSubmission(ipfsRequest);
      if(response.isSuccess) {
              this.showBlockchainSuccessNotification(response);
              this.TxResponse = response;
      }
  }

  /**
   * Constructs the Form Group and Form controls
   */
  private constructFormGroup(): void{
    this.formGroup = new FormGroup({
      name: new FormControl('', { validators: [ Validators.required ]}),
      title: new FormControl('',{ validators: [ Validators.required ]}),
      data: new FormControl('',{ validators:  [ Validators.required ]})
  });
  }

  /**
   * Gets the AbstractControl for the passed control name
   * @param controlName string - Control name as configured in FormGroup for the form
   */
  private getFormControl(controlName:string) : AbstractControl {
     return this.formGroup.get(controlName);
  }

  private setNameValidationMessage(c: AbstractControl): void{
     // Clear the existing validation message first
     this.nameValidationMessage = '';
     this.nameValidationMessage = this.getValidationMessage(c);
  }

  private getValidationMessage(c: AbstractControl): string {
    if ( (c.touched || c.dirty) && c.errors) {
      return Object.keys(c.errors).map(key => this._validationMessages[key]).join(' ');
    }
    return '';
  }

  /**
   * Constructs IPFSRequest based on user supplied form values
   */
  private getIPFSRequest() : IPFSAddRequest {
    const memoryInfo: MemoryInfo = new MemoryInfo();
    memoryInfo.name = this.getFormControl('name').value;
    memoryInfo.title = this.getFormControl('title').value;
    memoryInfo.data = this.getFormControl('data').value;

    const ipfsRequest: IPFSAddRequest = new IPFSAddRequest();
    ipfsRequest.memoryInfo = memoryInfo;

    return ipfsRequest;
  }

  private isStateValid(): boolean {
    return this.formGroup.valid;
  }

  private showIPFSSuccessNotification(ipfsResponse: IPFSAddResponse): void {
    const notificationMessage: NotificationMessage = new NotificationMessage();
    notificationMessage.message = `Hash: ${ipfsResponse.Hash}`;
    notificationMessage.title = 'Memory DAPP - Successful Save to IPFS';
    notificationMessage.icon = '../../assets/Ethereum.png';
    this._notificationProvider.showNotification(notificationMessage);
  }

  // private async saveToBlockchain(response:IPFSAddResponse){
  //   const memoryInfo = new MemoryInfo();
  //   memoryInfo.data = response.Hash;
  //   let transaction = await this._web3Provider.submitMemory(memoryInfo);
  //   return transaction;
  // }

  private showBlockchainSuccessNotification(response: TransactionResponse) {
    const notificationMessage: NotificationMessage = new NotificationMessage();
    notificationMessage.message = `Tx Hash: ${response.tx}`;
    notificationMessage.title = 'Memory DAPP - Successful Save to Ethereum';
    notificationMessage.icon = '../../assets/Ethereum.png';
    this._notificationProvider.showNotification(notificationMessage);
  }
}
