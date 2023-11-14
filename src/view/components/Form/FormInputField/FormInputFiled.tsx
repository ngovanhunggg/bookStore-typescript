import { FC } from "react";
import FormGroup from "../FormGroup/FormGroup";
import InputField, { IInputProps  } from "../../InputField/InputField";

interface IFormInputField extends Omit<IInputProps,'type' | 'className'> {
    messErr?: string;
}
 
const FormInputField:FC<IFormInputField> = ({label,messErr,...props}) => {
    return (
        <FormGroup
            id = {props.id}
            label = {label}
            messErr = {messErr}
        >
            <InputField
                // label={label}
                type="text"
                className="form_control"
                {...props}
                required
            />
        </FormGroup>
    )
}

export default FormInputField