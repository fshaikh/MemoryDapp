import React from "react";
import { Route, Switch } from "react-router-dom";
import NewSubmission from "../MemoryDappUI/NewSubmission/NewSubmission";
import ViewSubmission from "../MemoryDappUI/ViewSubmission/ViewSubmission";
import SubmissionList from "../MemoryDappUI/SubmissionList";
import FormComponent from "../MemoryDappUI/Form/FormComponent";

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/submission/new" component={NewSubmission} />
        <Route exact path="/submission/view" component={ViewSubmission} />
        <Route exact path="/submission/latest" component={SubmissionList} />
        <Route exact path="/form/new" component={FormComponent} />
      </Switch>
    );
  }
}
