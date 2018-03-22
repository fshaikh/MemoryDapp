var MemoryContract = artifacts.require("./MemoryContract.sol");
// We are using expect-style assertions provided by Mocha. The reason is to ensure same consistency 
// across front end, back end and Smart Contract tests. Since we are using Angular for front end which
// has Jasmine support (which has expect-style assertions), it will be easier for devs to write assertions without
// any context switching
var expect = require('../node_modules/chai/lib/chai').expect;

contract("MemoryContract",function(accounts){
    // Stores instance of MemoryContract
    let memoryContract;
    let memoryEtchedEvent;
    const REVERT_ERROR = "VM Exception while processing transaction: revert";
    const HASH_VALUE = "1234";

    /**
     * Hook called by Mocha before tests are run. Do tests wide initialization here
     */
    before(async function(){
        // Set the instance of MemoryContract
        memoryContract = await MemoryContract.deployed();
        memoryEtchedEvent = memoryContract.MemoryEtched({from:web3.eth.defaultAccount});
    });

    it("should return non empty owner value",async function(){
        let owner = await memoryContract.owner();
        expect(owner).to.not.be.null;
    });

    it("should set owner correctly",async function(){
        let owner = await memoryContract.owner();
        expect(owner).to.equal(accounts[0]);
    });

    it("should ensure price is 0.001 ETH",async function(){
        let price = await memoryContract.price();
        // convert price from BigNumber to a string representation
        expect(price.toString()).to.equal("1000000000000000");
    });

    it("should return 0 for submission index",async function(){
        let submissionIndex = await memoryContract.submissionIndex();
        // convert submissionIndex from BigNumber to a string representation
        expect(submissionIndex.toString()).to.equal('0');
    });

    it("should throw when calling addMemory with empty gas amount",async function(){
        try{
            await memoryContract.addMemory(HASH_VALUE);
            assert.fail('should have thrown before');
        } catch(error){
            expect(error.message).to.equal(REVERT_ERROR);
        }
    });

    it("should throw when calling addMemory with insufficient gas amount",async function(){
        try{
            await memoryContract.addMemory.sendTransaction(HASH_VALUE,{value:web3.toWei(0.0001, "ether")});
            assert.fail('should have thrown before');
        } catch(error){
            expect(error.message).to.equal(REVERT_ERROR);
        }
    });

    it("should add memory when calling addMemory with sufficient gas amount",async function(){
        try{
            await memoryContract.addMemory.sendTransaction(HASH_VALUE,{value:web3.toWei(0.001, "ether")});
            let submissionIndex = await memoryContract.submissionIndex();
            // convert submissionIndex from BigNumber to a string representation
            expect(submissionIndex.toString()).to.equal("1");
       } catch(error){
            console.log(error);
            assert.fail('should not have thrown');
        }
    });

    it("should emit MemoryEtched event when addMemory is successfully mined",async function(){
        try{
            var transaction = await memoryContract.addMemory.sendTransaction('1234',{value:web3.toWei(0.001, "ether")});
            var receipt = await web3.eth.getTransactionReceipt(transaction);
            expect(receipt.logs).to.not.be.null;
            expect(receipt.logs.length).to.equal(1);
       } catch(error){
           console.log(error);
            assert.fail('should not have thrown');
        }
    });

    it("should return Memory when passed a submissionId",async function(){
        try{
            await memoryContract.addMemory.sendTransaction('1234',{value:web3.toWei(0.001, "ether")});
            var value = await memoryContract.findMemory(1);
            expect(value).to.not.be.null;
            expect(value.length).to.equal(3);
            expect(value[1]).to.equal(HASH_VALUE);
       } catch(error){
           console.log(error);
            assert.fail('should not have thrown');
        }
    });

    it("should throw when passed an invalid submissionId",async function(){
        try{
            var value = await memoryContract.findMemory(10);
            assert.fail('should have thrown before');
        } catch(error){
            expect(error.message).to.equal(REVERT_ERROR);
        }
        
    });
});