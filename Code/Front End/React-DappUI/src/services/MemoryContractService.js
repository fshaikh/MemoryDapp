import contract from "truffle-contract";
// Load the Memory Contract JSON. Notice how we are loading the JSON here using json-loader npm package
// TODO: Change the location of the json file to builds folder
import MemoryContract from "./MemoryContract.json";
import web3Service from './Web3Service';

export class MemoryContractService {
    constructor() {
        this.memoryContractInstance = null;
        this.createMemoryContractInstance(); 
    }

    async createMemoryContractInstance(){
        // Pass the Contract JSON to get the contract instance
        const memoryContract = contract(MemoryContract);
        memoryContract.setProvider(web3Service.getWeb3().currentProvider);
        // // wait for deploy event
         var instance = await memoryContract.deployed();
         this.memoryContractInstance = instance;       
    }

    async submitMemory(info){
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
                                                    value:this.web3.utils.toWei(10000, "ether"),
                                                    // Max gas limit
                                                    gas:3000000,
                                                    // Send from the current user's account
                                                    from:this.web3.eth.defaultAccount
                                                });
        
        return transactionResponse;
    }
}

// Create a single instance of the SubmissionService
const memoryContractService = new MemoryContractService();
export default memoryContractService;






