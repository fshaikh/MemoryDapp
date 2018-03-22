import { ResponseBase } from "../ResponseBase";

/**
 * Represents a transaction response from Web3
 */
export class TransactionResponse extends ResponseBase {
    tx: string;
    receipt: TransactionReceipt;
    logs: TransactionLog[]
}

export class TransactionReceipt {
    blockHash: string;
    blockNumber: number;
    cumulativeGasUsed: number;
    gasUsed: number;
    status: number;
    transactionIndex: number;

}

export class TransactionLog {
    type: string;
    event: string;
    logIndex: number;
    args: any;
}