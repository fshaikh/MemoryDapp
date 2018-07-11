/ Save to IPFs firstimport { Injectable } from "@angular/core";
import { IPFSService } from "../IPFS/ipfs.service";
import { SubmissionResponse } from "../../Models/Ethereum/SubmissionResponse";
import { SubmissionRequest } from "../../Models/Ethereum/SubmissionRequest";
import { IPFSGetResponse } from "../../Models/IPFS/IPFSGetResponse";
import { IPFSGetRequest } from "../../Models/IPFS/IPFSGetRequest";
import { MemoryInfo } from "../../Models/MemoryInfo";
import { IPFSAddRequest } from "../../Models/IPFS/IPFSAddRequest";
import { MemoryContractTransactionResponse } from "../../Models/Ethereum/MemoryContractTransactionResponse";
import { AppInfo } from "../../Models/Appinfo";
import { RecentSubmissionsRequest } from "../../Models/RecentSubmissionsRequest";
import { MemoryContractService } from "../web3/memorycontract.service";

/**
 * Submission service which acts as a facade to talk to ipfs provider and web3
 */
@Injectable()
 export class SubmissionService {
    
    /**
     * Initializes a new instance of SubmissionService
     * @param _ipfsProvider - IPFS Provider
     * @param _memoryContractService - Memory Smart Contract Service
     */
    constructor(private _ipfsProvider: IPFSService, private _memoryContractService: MemoryContractService){
        // Do nothing
    }

    public async getSubmission(submissionRequest: SubmissionRequest) : Promise<IPFSGetResponse> {
        let response: IPFSGetResponse = new IPFSGetResponse();
        // Get submission from web3
        let submissionResponse: SubmissionResponse = await this._memoryContractService.getSubmission(submissionRequest);
        if(!submissionResponse.isSuccess) {
            response.isSuccess = false;
            return response;
        }
        // Get data from IPFS
        let ipfsGetRequest: IPFSGetRequest = new IPFSGetRequest();
        ipfsGetRequest.hash = submissionResponse.hashValue;
        let ipfsGetResponse: IPFSGetResponse = await this._ipfsProvider.getData(ipfsGetRequest);
        if(!ipfsGetResponse.isSuccess) {
            response.isSuccess = false;
            return response;
        }

        response.memoryInfo = ipfsGetResponse.memoryInfo;
        response.submissionResponse = submissionResponse;
        return response;
    }

    public async addSubmission(ipfsRequest: IPFSAddRequest): Promise<MemoryContractTransactionResponse> {
        let response: MemoryContractTransactionResponse = new MemoryContractTransactionResponse();
        // Save to IPFS first
        const ipfsResponse = await this._ipfsProvider.addData(ipfsRequest);
        if(!ipfsResponse.isSuccess) {
            response.isSuccess = false;
            return response;
        }
        const memoryInfo = new MemoryInfo();
        memoryInfo.data = ipfsResponse.Hash;
        let transactionResponse = await this._memoryContractService.submitMemory(memoryInfo);
        if(!transactionResponse.isSuccess) {
            response.isSuccess = false;
            return response;    
        }
        return transactionResponse;
    }

    public async getRecentSubmissions(request: RecentSubmissionsRequest) : Promise<IPFSGetResponse[]> {
        let submissions: IPFSGetResponse[] = [];
        
        // Get the latest submission count
        const latestSubmissionCount: number = await this._memoryContractService.getSubmissionCount();
        // compute the start index
        const startIndex = Math.max(1, latestSubmissionCount - request.fetchCount);
        for(let index = latestSubmissionCount; index >= startIndex; index--) {
            let submissionRequest: SubmissionRequest = new SubmissionRequest();
            submissionRequest.submisionId = index;

            let response = await this.getSubmission(submissionRequest);
            if(response.isSuccess) {
                submissions.push(response);
            }
        }


        return submissions;
    }

    public getSubmissionPrice(): string {
        return this._memoryContractService.getSubmissionPrice();
    }

    public async getAppInfo(): Promise<AppInfo> {
        return await this._memoryContractService.getAppInfo();
    }
 }