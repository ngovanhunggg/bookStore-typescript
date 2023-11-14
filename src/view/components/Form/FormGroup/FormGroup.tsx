import {FC, ReactNode} from 'react'

interface IFormGroup {
    id?: string;
    children?: ReactNode;
    label?: string
    messErr? : string;
}

const FormGroup:FC<IFormGroup> = ({id,label,messErr,children}) => {
    return (
        <div className="form_group">
            <label htmlFor={id}>{label}</label>
            {children}
            <span className="form_message" id={`${id}_error`}>
                {messErr}
            </span>
        </div>
    )
}

export default FormGroup