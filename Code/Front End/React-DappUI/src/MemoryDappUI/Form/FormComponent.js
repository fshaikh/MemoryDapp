import React from "react";
import FormService from "../../services/Form/FormService";

import FormFieldComponent from "./FormFieldComponent";


export default class FormComponent extends React.Component {
    state = {
        form: {}
    };

    constructor() {
        super();
        this._formService = new FormService();
    }

    componentWillMount() {
        const form = this._formService.getForm(1);
        this.setState((prevState, props)=> {
            return {
                form: form
            }
        });
        
    }

    

    render() {
        return (
            <form className="form-container">
                {
                    this.state.form.fields.map((field) =>  <FormFieldComponent field={field} />)
                }
            </form>
        );
    }
}