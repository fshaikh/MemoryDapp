import { ResponseBase } from "../ResponseBase";

export class SubmissionResponse extends ResponseBase {
    sender: string;
    hashValue: string;
    creationTimestamp: string;
    submissionId: number;
}