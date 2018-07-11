import ShortTextField from './ShortTextField';
import React from "react";

export default function getFormField(field) {
    switch(field.type){
        case 1:
            return <ShortTextField field={field} />;
    }
}