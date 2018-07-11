import React from "react";

export default class FormFieldBase extends React.Component {
     state = {
         id: '',
         name: '',
         type: 0
     };

     constructor() {
         super();
     }
}