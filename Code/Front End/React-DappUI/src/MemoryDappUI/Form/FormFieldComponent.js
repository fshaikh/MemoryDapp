import React from "react";
import getFormField from "./FormFieldFactory";


export default class FormFieldComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const formField = getFormField(this.props.field);
        return (
                <div className="form-group">
                   {formField}
                </div>
        );
    }
}