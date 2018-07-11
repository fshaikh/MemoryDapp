/**
 * Web3 Service. Use this service to interact with blockchain network
 */
import Web3 from "web3";

class Web3Service {
  /**
   * Initializes a new instance of Web3Service
   */
  constructor() {
    this.web3 = null;
    this.initWeb3Provider();
  }

  /**
   * Initializes Web3 Provider details. This includes:
   *    - Either injected Web3 instance or local Web3 Provider
   *    - Default Account
   *    - Current Network
   *    - ...
   */
  async initWeb3Provider() {
    let windowObj: any = window;
    this.web3 = windowObj.web3;
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof this.web3 !== "undefined") {
      console.warn(
        `Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, 
                ensure you\'ve configured that source properly. If using MetaMask, see the following link.
                Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask`
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.web3 = new Web3(
        //new Web3.providers.HttpProvider(environment.web3ProviderUrl)
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
    }
  }

  /**
   * Gets the current ethereum network
   */
  async getCurrentNetwork() {
    const networkId = await this.web3.eth.net.getId();
    let networkEnumValue = "";
    switch (networkId) {
      case "1":
        networkEnumValue = "Main";
        break;
      case "2":
        networkEnumValue = "Morden";
        break;
      case "3":
        networkEnumValue = "Ropsten";
        break;
      case "4":
        networkEnumValue = "Rinkeby";
        break;
      case "5":
        networkEnumValue = "Kovan";
        break;
      default:
        networkEnumValue = "Unknown";
        break;
    }
    return networkEnumValue;
  }

  getWeb3(){
    return this.web3;
  }
}

// Create a single instance of the Web3Service
const web3Service = new Web3Service();
export default web3Service;
