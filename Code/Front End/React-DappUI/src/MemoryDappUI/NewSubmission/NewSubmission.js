import React from "react";
import {Prompt} from 'react-router-dom';
import ipfsService from '../../services/IPFSService';
import './NewSubmission.css';

export default class NewSubmision extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmission = this.onSubmission.bind(this);
    this.state = {
      isDirty: false
    }
  }

  async onSubmission(event) {
    event.preventDefault();
    // construct the data from the form values
    const submission = {
      name: this.name.value,
      title: this.title.value,
      message: this.message.value
    };
    // Call the service to send the submission
    try {
      const response = await ipfsService.addJSON(submission);
      console.log(response);
    } catch (reason) {
      console.log(reason);
    }
  }


  onChange = (event) => {
    this.setState({ isDirty: this.canSubmit() });
  }

  canSubmit = () => {
    return this.name.value.length > 0 &&
           this.title.value.length > 0 &&
           this.message.value.length > 0;
  }

  render() {
    return (
      <form onSubmit={this.onSubmission} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            ref={node => (this.name = node)}
            placeholder="Enter name"
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            ref={node => (this.title = node)}
            placeholder="Enter Title"
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="data">Enter Your Text</label>
          <textarea
            type="data"
            className="form-control"
            ref={node => (this.message = node)}
            onChange={this.onChange}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary pull-right"
          value="Etch Memory"
          disabled={!this.state.isDirty}
        />
        <Prompt
            when={this.state.isDirty}
            message="Are you sure you want to navigate away? You submission data will be lost."
         />
      </form>
    );
  }
}
