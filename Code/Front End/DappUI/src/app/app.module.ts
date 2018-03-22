import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Feature modules
import {SharedModule} from '../shared/shared.module';
import { MemoryDappUiModule } from '../memoryDappUI/memory-dapp-ui.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';

// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'welcome',component: WelcomeComponent  },
  {  path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    MemoryDappUiModule,
    RouterModule.forRoot(routes,{ useHash: true }),
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
