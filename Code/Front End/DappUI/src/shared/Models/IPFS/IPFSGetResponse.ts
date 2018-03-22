import { ResponseBase } from "../ResponseBase";
import { MemoryInfo } from "../MemoryInfo";
import { SubmissionResponse } from "../Ethereum/SubmissionResponse";

/**
 * Represents a get response from IPFS
 */
export class IPFSGetResponse extends ResponseBase {
    memoryInfo: MemoryInfo;
    submissionResponse: SubmissionResponse;
}