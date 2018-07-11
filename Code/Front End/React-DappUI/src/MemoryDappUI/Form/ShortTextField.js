import FormFieldBase from "./FormFieldBase";
import { Label } from './LabelComponent';
import React from "react";

export default class ShortTextField extends FormFieldBase {
    constructor(props) {
        super(props);
        console.log(props.field);
    }

    render() {
        return (
          <div>
            <Label label={this.props.field.label} />
            <input
                name={this.props.field.name}
                id={this.props.field.id}
                type="text"
                className="form-control"
                placeholder={`Enter ${this.props.field.label}`}
            />
          </div>
        );
    }
}