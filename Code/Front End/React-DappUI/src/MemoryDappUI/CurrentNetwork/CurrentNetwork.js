import React from "react";
import "./CurrentNetwork.css";

export default class CurrentNetwork extends React.Component {
  render() {
    return (
      <div>
        <span>Current Network: </span>
        <span>{this.props.currentNetwork}</span>
      </div>
    );
  }
}
