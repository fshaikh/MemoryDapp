declare var require: any;

import { Injectable } from '@angular/core';
import { Menu } from '../../Models/UI/Menu';

const Menus = require('json-loader!./menu.json');

/**
 * Service for menu. Client invoke the service to retreive menu from any source
 */
@Injectable()
export class MenuService {
    constructor() {

    }
    
    public async getMenu(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(Menus);
        });
    }
}

