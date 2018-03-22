// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// App imports
import { IPFSService } from './services/IPFS/ipfs.service';
import { Web3Provider } from './services/web3/web3.service';
import { MemoryContractService } from './services/web3/memorycontract.service';
import { HTML5NotificationProvider } from './services/notification/html5notificationprovider.service';
import { SubmissionService } from './services/submission/submission.service';
import { MenuService } from './services/menu/menu.service';


@NgModule({
  imports: [
    CommonModule ,
    HttpClientModule
  ],
  declarations: [],
  providers :[
    HttpClientModule,
    MenuService,
    // This is a provider object literal with two properties:
    //    provide : token that serves as a key. DI maintains token:provider map.
    //    useClass: recipe on how to create the dependency
    // When doing constructor injection:
    //    1. Injector reads the token for the injected dependency. For eg: private _ipfsService IPFSService.
    //       In this case, IPFSService is the token read by the injector
    //    2. Injector looks up the map with the read token and fetches the recipe (useClass property)
    //    3. Injector creates the dependency using the recipe
    //    4. Injector injects the created dependency
    { provide: IPFSService, useClass: IPFSService },
    // This is actually a shorthand expression for a provider registration
    Web3Provider,
    MemoryContractService,
    SubmissionService,
    
    // Interface cannot be used as token since interface is a typescript feature which is not emitted
    // Hence using interface as a string value for a token
    // Inject as : @Inject('INotificationProvider') private _notificationProvider:INotificationProvider
    { provide: 'INotificationProvider', useClass: HTML5NotificationProvider}
  ]
})
export class SharedModule { }
