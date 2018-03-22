declare var require: any;
import { Injectable } from '@angular/core';
// Import the environment-specific settings. Angular will inject the correct settings
// based on the dev/prod environment
import { environment } from '../../../environments/environment';
import { IPFSAddRequest } from '../../Models/IPFS/IPFSAddRequest';
import { IPFSAddResponse } from '../../Models/IPFS/IPFSAddResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPFSProviderInfo } from '../../Models/IPFS/IPFSProviderInfo';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { IPFSGetResponse } from '../../Models/IPFS/IPFSGetResponse';
import { MemoryInfo } from '../../Models/MemoryInfo';
import { IPFSGetRequest } from '../../Models/IPFS/IPFSGetRequest';
const IPFS = require('../../../assets/ipfs-mini.min.js');

@Injectable()
export class IPFSService {
  
  public _ipfsProviderInfo: IPFSProviderInfo;
  private _ipfs: any;

  constructor(private http: HttpClient) {
        console.log('IPFS Service Constructor');
        this._ipfsProviderInfo = new IPFSProviderInfo();
        this._ipfsProviderInfo.host = environment.ipfsProviderUrl;
        this._ipfsProviderInfo.protocol = environment.protocol;
        this._ipfs = new IPFS({ provider: environment.ipfsProviderUrl, protocol: environment.protocol });
   }

  public addData(request: IPFSAddRequest): Promise<IPFSAddResponse> {
    return new Promise((resolve,reject) => {
       let response = new IPFSAddResponse();

       this._ipfs.addJSON(request.memoryInfo,(err,hash) => {
            if(err){
              response.isSuccess = false;
              response.message = err;
              reject(response);
            }else{
              response.Hash = hash;
              resolve(response);
            }
       });
    });
  }

  public getData(request: IPFSGetRequest): Promise<IPFSGetResponse> {
    return new Promise((resolve, reject) => {
        let response = new IPFSGetResponse();

        this._ipfs.catJSON(request.hash, (err, data) => {
            if(err) {
              response.isSuccess = false;
              return resolve(response);
            } 
            response.memoryInfo = new MemoryInfo();
            response.memoryInfo.name = data.name;
            response.memoryInfo.title = data.title;
            response.memoryInfo.data = data.data;
            return resolve(response);
        });
    });
  }
}
