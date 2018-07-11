import IPFS from "ipfs-mini";

/**
 * Responsible for all IPFS-related operations
 */
class IPFSService {
  /**
   * Initializes a new instance of IPFSService
   */
  constructor() {
    // Set the IPFS connection details
    // TODO: Read from .env file
    this.ipfs = new IPFS({
      host: "ipfs.infura.io", //process.env.REACT_APP_IPFSPROVIDER_URL,
      port: 5001, //process.env.REACT_APP_IPFSPROVIDER_PORT,
      protocol: "https" //process.env.REACT_APP_IPFSPROVIDER_PROTOCOL
    });
  }

  /**
   * Adds JSON blob to IPFS
   */
  async addJSON(data) {
    return new Promise((resolve, reject) => {
      this.ipfs.addJSON(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Retreives JSON blob from IPFS
   */
  async getJSON(request) {
    return new Promise((resolve, reject) => {
      this.ipfs.catJSON(request.hash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

// Create a single instance of the IPFSService
const ipfsService = new IPFSService();
export default ipfsService;
