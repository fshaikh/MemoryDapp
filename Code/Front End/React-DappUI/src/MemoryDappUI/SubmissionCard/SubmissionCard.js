import React from "react";
import "./SubmissionCard.css";

export default class SubmissionCard extends React.Component {
  render() {
    return (
      <div className="card" key={this.props.card.id}>
        <div class="card-header">{this.props.card.name}</div>
        <div className="card-body">
          <h5 className="card-title">{this.props.card.title}</h5>
          <p className="card-text">{this.props.card.message}</p>
        </div>
      </div>
    );
  }
}
