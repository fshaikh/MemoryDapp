
declare var require: any;
import { Injectable } from "@angular/core";
// Import truffle-contract module whoch makes it easy to interact with contracts from Dapp clients
const contract = require('truffle-contract');
// Load the Memory Contract JSON. Notice how we are loading the JSON here using json-loader npm package
// TODO: Change the location of the json file to builds folder
const MemoryContract = require('json-loader!./MemoryContract.json');

import { Web3Provider } from './web3.service';
// Import environment settings
import { environment } from '../../../environments/environment';
import { SubmissionRequest } from "../../Models/Ethereum/SubmissionRequest";
import { SubmissionResponse } from "../../Models/Ethereum/SubmissionResponse";
import { MemoryInfo } from "../../Models/MemoryInfo";
import { MemoryContractTransactionResponse } from "../../Models/Ethereum/MemoryContractTransactionResponse";
import { AppInfo } from "../../Models/Appinfo";
/**
 * Service for interacting with Memory Smart Contract
 */
@Injectable()
 export class MemoryContractService extends Web3Provider {
     /**
     * Memory Smart Contract instance
     */
    private memoryContractInstance:any;

    /**
     * Watcher for MemoryEtched event
     */
    private memoryEtchedEventWatcher:any;

    constructor() {
        super();
       this.createMemoryContractInstance();
    }

    public async submitMemory(info:MemoryInfo) : Promise<MemoryContractTransactionResponse> {
        if(this.memoryContractInstance == null){
            console.log("Deploy Memory Contract and retry");
            return;
        }

        // Invoke the smart contract function.
        // NOTE: Since we are using truffle-contract package, we need not invoke 
        // sendTransaction method. We can directly call the smart contract function (addMemory here)
        // truffle-contract will internally take care of calling the function using sendTransaction

        // NOTE: Returns Transaction Receipt. This does not indicate that the transaction has been
        // added to a mined block
        var transactionResponse = await this.memoryContractInstance.addMemory(
                                                info.data, // Hash of the data
                                                {
                                                    // Send 0.001 ETH as tranaction fee
                                                    value:this.web3.utils.toWei(environment.txPrice, "ether"),
                                                    // Max gas limit
                                                    gas:3000000,
                                                    // Send from the current user's account
                                                    from:this.web3.eth.defaultAccount
                                                });
        var memoryContractTxResponse: MemoryContractTransactionResponse = new MemoryContractTransactionResponse();
        this.parseTransactionResponse(transactionResponse,memoryContractTxResponse);
        this.parseLogArgs(memoryContractTxResponse);
        console.log(transactionResponse);
        return memoryContractTxResponse;
    }

    public getSubmissionPrice(): string {
        return environment.txPrice;
    }

    public async getSubmission(request: SubmissionRequest) : Promise<SubmissionResponse> {
        if(this.memoryContractInstance == null) {
            console.log("Deploy Memory Contract and retry");
            return;
        }
        let submissionResponse: SubmissionResponse = new SubmissionResponse();
        var response = await this.memoryContractInstance.findMemory(request.submisionId);
        if(response == null || response.length !== 3) {
            submissionResponse.isSuccess = false;
            return submissionResponse;
        }
        
        submissionResponse.submissionId = request.submisionId;
        submissionResponse.sender = response[0];
        submissionResponse.hashValue = response[1];
        submissionResponse.creationTimestamp = response[2].toString();
        
        return submissionResponse;
    }

    public async getSubmissionCount(): Promise<number> {
        const submissionIndex = await this.memoryContractInstance.submissionIndex();
        return +submissionIndex;
    }

    public async getAppInfo() : Promise<AppInfo> {
        let appInfo = await super.getAppInfo();
        appInfo.contractOwner = await this.memoryContractInstance.owner();
        return appInfo;
    }

    private async createMemoryContractInstance(){
        // Pass the Contract JSON to get the contract instance
        const memoryContract = contract(MemoryContract);
        memoryContract.setProvider(this.web3.currentProvider);
        // wait for deploy event
        var instance = await memoryContract.deployed();
        this.memoryContractInstance = instance;

        
    }

    private parseLogArgs(response: MemoryContractTransactionResponse): void {
        response.submisionId = response.logs[0].args.submissionId.toString();
    }

    private wireTxEvents(){
       this.memoryEtchedEventWatcher = this.memoryContractInstance.MemoryEtched({from:this.web3.eth.defaultAccount});
       this.memoryEtchedEventWatcher.watch(MemoryContractService.prototype.memoryEtchedEventHandler);
    }

    private memoryEtchedEventHandler(error,result){
        console.log(error?error:result);
    }
 }