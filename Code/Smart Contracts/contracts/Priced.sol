pragma solidity ^0.4.17;

/**
  @dev Enforces that the contract function is executed only when the price requirement is met

 */
contract Priced {
    /**
     * @dev Throws if called without required price being paid by the account.
     */
    modifier enforcePrice(uint _price){
        require(msg.value >= _price);
        _;
    }
}