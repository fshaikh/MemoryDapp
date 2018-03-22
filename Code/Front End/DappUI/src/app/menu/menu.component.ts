import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services/menu/menu.service';
import { Menu } from '../../shared/Models/UI/Menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: Menu[];
  constructor(private _menuService: MenuService) { }

  async ngOnInit() {
      this.menu = await this._menuService.getMenu();
  }

  getRoute(menu: Menu): string {
    return `${menu.route}`;
  }

}
