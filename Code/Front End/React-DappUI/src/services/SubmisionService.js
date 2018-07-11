import ipfsService from './IPFSService';
import web3Service from './Web3Service';
import memoryContractService from './MemoryContractService';

class SubmissionService {
    constructor(){

    }

    /**
   * Gets the current ethereum network
   */
  async getCurrentNetwork() {
      return await web3Service.getCurrentNetwork();
  }

  async addSubmission(submission) {
      // add submission to IPFS
    //   try {
    //     const response = await ipfsService.addJSON(submission);
    //     console.log(response);
    //     // get the hash from IPFS and add to ethereum
    //     memoryInfo.data = ipfsResponse.Hash;
    //     let transactionResponse = await memoryContractService.submitMemory(memoryInfo);
    //     if(!transactionResponse.isSuccess) {
    //         response.isSuccess = false;
    //         return response;    
    //     }
    //   } catch (reason) {
    //     console.log(reason);
    //     return false;
    //   }
      
  }
  
}

// Create a single instance of the SubmissionService
const submissionService = new SubmissionService();
export default submissionService;