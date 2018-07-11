import React, { Component } from "react";
import { createBrowserHistory } from "history";

import { Header } from "./Header";
import { Menu } from "./Menu";
import CenterContent from "./CenterContent";
import EventManager from "../services/EventManager";
import submisionService from "../services/SubmisionService";
import "./App.css";

const browserHistory = createBrowserHistory();
export default class App extends Component {
  state = {
    currentNetwork: "Unknown"
  };

  constructor(props) {
    super(props);
    EventManager.EE.on("search", this.onSearch);
  }

  /**
   * TODO: Going forward, componentWillMount will be deprecated. 
   * The recommended upgrade path for most use cases is to move data-fetching into componentDidMount
   */
  async componentWillMount() {
      // Moved to componentDidMount
      //await this.fetchCurrentNetwork();
  }

  async componentDidMount() {
    await this.fetchCurrentNetwork();
  }

  async fetchCurrentNetwork() {
    const network = await submisionService.getCurrentNetwork();
    this.setState({ currentNetwork: network });
  }

  onSearch = args => {
    // navigate to search UI
    browserHistory.push("/search");
  };

  render() {
    return (
      <div className="app-container">
        <Header currentNetwork={this.state.currentNetwork} />
        <div className="row app-container">
          <div className="col-sm-2 menu">
            <Menu />
          </div>
          <div className="col-sm-10 center-content">
            <CenterContent />
          </div>
        </div>
      </div>
    );
  }
}
