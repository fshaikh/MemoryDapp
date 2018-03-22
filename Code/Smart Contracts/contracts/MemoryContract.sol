/**
 * Dapp allows users to etch words for eternity in blockchain
 *
 * @description MemoryPolicy contract.
 * @notice All function calls to the contract require 0.001 ETH
 * @copyright (c) 2018 Furqan Shaikh
 * @author Furqan Shaikh
 */

pragma solidity ^0.4.17;

import "./Owned.sol";
import "./Priced.sol";

contract MemoryContract is Owned, Priced {
    /**
      Events declarations
    */
    event MemoryEtched(address sender,uint submissionId,string hashValue,uint creationTimestamp);

    /**
        Custom data types - struct declarations
     */
     struct MemoryHash {
         // Sender of the memory content
         address sender;
         // Hash of the content
         string hashValue;
         // Creation timestamp
         uint creationTimestamp;
     }

    /**
    *     Contract state variables go here
    **/
    // Price for executing transactions on the contract
    uint public price;
    // Stores the submision index
    uint public submissionIndex;
    // Mapping to store submission index and its corresponding hash
    mapping(uint => MemoryHash) public memoryHashMapping;

    /*
    *  Constructor
    * @param _price - Price in ether
    */
    function MemoryContract(uint _price) public {
        // Ensure the price is set correctly
        require(_price > 0);
        // set the price
        price = _price;
        submissionIndex = 0;
    }

    /*
    *  Public functions
    */

    /**
    @notice - Saves the content hash into contract state mapping. Raises the event to allow client(front end, etc) to take
    appropriate action
     */
     function addMemory(string hashOfContent) payable public enforcePrice(price) {
         uint submissionId = ++submissionIndex;
         memoryHashMapping[submissionId].sender = msg.sender;
         memoryHashMapping[submissionId].hashValue = hashOfContent;
         memoryHashMapping[submissionId].creationTimestamp = block.timestamp;

         // Trigger the event so :
         // 1. Gets logged in transaction logs
         // 2. Front end can get notified
         MemoryEtched(msg.sender,submissionId,hashOfContent,memoryHashMapping[submissionId].creationTimestamp);
     }

     /**
     @notice Returns the HashMemory corresponding to the passed in submission Id
     @param submissionId - Submission Id returned in call to addMemory
     */
     function findMemory(uint submissionId) public view returns(address sender,string hashValue,uint timestamp) {
         require(submissionId <= submissionIndex);
         return (
                 memoryHashMapping[submissionId].sender,
                 memoryHashMapping[submissionId].hashValue,
                 memoryHashMapping[submissionId].creationTimestamp
                );
     }
}