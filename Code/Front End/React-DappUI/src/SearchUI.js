import React from 'react';

export default class SearchUI extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }

  render(){
    return(
        <h1>Search</h1>
    );
  }
}