import { TestBed, inject } from '@angular/core/testing';
// Add this to allow HttpClient to be injectable in testing
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IPFSService } from './ipfs.service';

describe('IPFSService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IPFSService],
      // Add this to imports
      imports:[HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([IPFSService], (service: IPFSService) => {
    expect(service).toBeTruthy();
  }));

  it('should set IPFS provider info based on environment',inject([IPFSService], (service: IPFSService) => {
    expect(service._ipfsProviderInfo).toBeDefined();
  }));

  it('should set IPFS provider info based on environment',inject([IPFSService], (service: IPFSService) => {
    expect(service._ipfsProviderInfo).toBeDefined();
  }));
});
