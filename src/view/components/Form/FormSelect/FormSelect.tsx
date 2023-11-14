import { FC, SelectHTMLAttributes } from "react";
import FormGroup from "../FormGroup/FormGroup";
import { topics } from "../../Table/Table";

type Ref = HTMLSelectElement
interface IFormSelect extends SelectHTMLAttributes<Ref> {
    label?: string;
}

const FormSelect:FC<IFormSelect> = ({id,label,onChange}) => {
    return (
        <FormGroup
            id={id}
            label={label}
        >
            <select name={id} id={id} className="form_control"
                onChange={onChange}
            >
                {Object.keys(topics).map(t => (
                    <option
                        key={`topic-${t}`}
                        value={t}
                    >
                        {topics[t]}
                    </option>
                ))}
            </select>
        </FormGroup>
    )
}

export default FormSelect