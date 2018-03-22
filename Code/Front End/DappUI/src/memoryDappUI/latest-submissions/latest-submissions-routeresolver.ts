import { IPFSGetResponse } from "../../shared/Models/IPFS/IPFSGetResponse";
import { SubmissionService } from "../../shared/services/submission/submission.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { RecentSubmissionsRequest } from "../../shared/Models/RecentSubmissionsRequest";
import { environment } from '../../environments/environment';

/**
 * Route resolver for /latest route. Fetches the latest submissions from
 * SubmissionService and passes to the component which is the route target
 */
export class LatestSubmissionsRouteResolver implements Resolve<IPFSGetResponse[]> {
    
    // constructor(private _submissionService: SubmissionService) {
        
    // }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IPFSGetResponse[]> {
        // let request: RecentSubmissionsRequest = new RecentSubmissionsRequest();
        // request.fetchCount = environment.fetchCount;
        // console.log(request);
        // return await this._submissionService.getRecentSubmissions(request);
        return [];
    }
}