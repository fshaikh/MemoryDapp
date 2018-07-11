import React from "react";
import { NavLink } from "react-router-dom";
import getMenu from '../services/Menu/MenuService';

export class Menu extends React.Component {
  state = {
    menus: []
  }

  async componentDidMount() {
    this.setState({menus: await getMenu()});
  }
  render() {
    return (
      // <ul className="navbar-nav flex-column">
      //   <li className="nav-item">
      //     <i className="fa fa-plus-circle fa-2x" />
      //     <NavLink to="/submission/new">New Submission</NavLink>
      //   </li>
      // </ul>
      <ul className="navbar-nav flex-column">
        {
          this.state.menus.map(menu => (
          <li className="nav-item" key={menu.id}>
              <NavLink to={menu.route}>{menu.title}</NavLink>
          </li>
          ))
        }
      </ul>
    );
  }
}
