import React from "react";
import SubmissionCard from "./SubmissionCard/SubmissionCard";

export default class SubmissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [
        {
          id: 1,
          name:"Furqan",
          title: "Furqan",
          message: "This is my first"
        },
        {
          id: 2,
          "name":"Sana",
          title: "Sana",
          message: "This is my second"
        }
      ]
    };
  }
  componentWillMount() {
    // fetch the last five from IPFS
  }
  render() {
    return (
      <div className="card-container">
        {this.state.submissions.map(submission => (
          <SubmissionCard card={submission} />
        ))}
      </div>
    );
  }
}
