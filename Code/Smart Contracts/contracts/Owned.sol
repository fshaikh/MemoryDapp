/**
 * Base class for all contracts
 */

 pragma solidity ^0.4.17;

/**
  @title  Owned contract
  @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
 contract Owned {
     address public owner;
     

     function Owned() public {
         owner = msg.sender;
     }

     /**
     * @dev Throws if called by any account other than the owner.
     */
     modifier onlyOwner() {
         require(msg.sender == owner);
         _;
     }
 }