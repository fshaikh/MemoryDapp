declare var require: any;
// Import the web3 module
const Web3 = require('web3');
// Import required Angular modules
import { Injectable } from '@angular/core';

// Import environment settings
import { environment } from '../../../environments/environment';
import { AppInfo } from '../../Models/Appinfo';
import { TransactionResponse, TransactionReceipt, TransactionLog } from '../../Models/Ethereum/TransactionResponse';
import { EthereumNetwork } from '../../Models/Ethereum/NetworkEnum';
import { EnumUtils } from '../../utils/EnumUtils';

/**
 * Service which provides access to Web3 APIs
 */
@Injectable()
export class Web3Provider{
    
    /**
     * Web3 instance
     */
    protected web3:any;

    private currentNetwork: string;
    

    /**
     * App Info
     */
    protected _appInfo:AppInfo;

    constructor(){
        console.log('Web3 Provider Constructor');
        // initialize Web3 provider and load the smart contract instance
        this.initWeb3Provider();
    }

    public async getCurrentNetwork() : Promise<string> {
        const networkId = await this.web3.eth.net.getId();
        let networkEnumValue = 0;
        switch(networkId) {
            case "1" :
               networkEnumValue = EthereumNetwork.Main;
               break;
            case "2":
               networkEnumValue = EthereumNetwork.Morden;
               break;
            case "3":
               networkEnumValue = EthereumNetwork.Ropsten;
               break;
            case "4":
                networkEnumValue = EthereumNetwork.Rinkeby;
                break;
            case "5":
                networkEnumValue = EthereumNetwork.Kovan;
                break;
            default :
                networkEnumValue = EthereumNetwork.Unknown;
                break;
        }
        return EnumUtils.getEnumString(EthereumNetwork,networkEnumValue);
    }

    public async getAppInfo(): Promise<AppInfo> {
        if(this._appInfo){
            return this._appInfo;
        }
        this._appInfo = new AppInfo();

        this._appInfo.currentAccount = this.web3.eth.defaultAccount;
        this._appInfo.network = await this.getCurrentNetwork();

        return this._appInfo;
    }

    public getCurrent

    protected parseTransactionResponse(transactionResponse: any, response: TransactionResponse) {
        response.tx = transactionResponse.tx;
        response.receipt = new TransactionReceipt();
        response.receipt.blockHash = transactionResponse.receipt.blockHash;
        response.receipt.blockNumber = +transactionResponse.receipt.blockNumber;
        response.receipt.cumulativeGasUsed = +transactionResponse.receipt.cumulativeGasUsed;
        response.receipt.gasUsed = +transactionResponse.receipt.gasUsed;
        response.receipt.status = +transactionResponse.receipt.status;
        response.receipt.transactionIndex = +transactionResponse.receipt.transactionIndex;
        this.parseTransactionLog(response,transactionResponse);
        return response;
    }

    private async  initWeb3Provider(){
        let windowObj:any = window;
        this.web3 = windowObj.web3;
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof this.web3 !== 'undefined') {
            console.warn(
                `Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, 
                ensure you\'ve configured that source properly. If using MetaMask, see the following link.
                Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask`
              );
            // Use Mist/MetaMask's provider
            this.web3 = new Web3(this.web3.currentProvider);
        } else {
           // set the provider you want from Web3.providers
            this.web3 = new Web3(new Web3.providers.HttpProvider(environment.web3ProviderUrl));
       }

        // get accounts
        this.web3.eth.getAccounts()
                     .then((accounts)=>{
                        this.web3.eth.defaultAccount = accounts[0];
                     })
                     .catch((reason)=>{
                        console.log(reason);
                     });
    }
    

    private parseTransactionLog(response: TransactionResponse,transactionResponse: any): void {
        const logs = transactionResponse.logs;
        if(logs == null || logs.count === 0) {
            response.isSuccess = false;
            return;
        }

        const memoryEtchedLog = logs[0];
        let transactionLog: TransactionLog = new TransactionLog();
        transactionLog.event = memoryEtchedLog.event;
        transactionLog.logIndex = +memoryEtchedLog.logIndex;
        transactionLog.type = memoryEtchedLog.type;
        transactionLog.args = memoryEtchedLog.args;
        response.logs = [];
        response.logs.push(transactionLog);
    }

    
}