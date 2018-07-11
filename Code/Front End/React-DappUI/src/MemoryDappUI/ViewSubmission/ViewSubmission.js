import React from 'react';
import ipfsService from '../../services/IPFSService';
import './ViewSubmission.css';

export default class ViewSubmission extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      isDirty: false
    };
  }

  async onSubmit(event){
    event.preventDefault();

    const request = {
      hash: this.submissionId.value
    };

    try{
        const response = await ipfsService.getJSON(request);
        console.log(response);
    }catch(reason){
        console.log(reason);
    }
  }

  onChange = (event) => {
    if(event.target.value !== ''){
      this.setState({isDirty: true});
    }
  }

  render(){
    return (
      <form onSubmit={this.onSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Enter Submission ID or IPFS Hash</label>
          <input
            type="text"
            className="form-control"
            ref={node => (this.submissionId = node)}
            placeholder="Enter Submision ID or IPFS Hash"
            onChange={this.onChange}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary pull-right"
          value="View Submission"
          disabled={!this.state.isDirty}
        />
      </form>
    );
  }
}