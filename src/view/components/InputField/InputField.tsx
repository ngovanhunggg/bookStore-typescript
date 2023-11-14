import {forwardRef,InputHTMLAttributes} from 'react';

export type Ref = HTMLInputElement;

export interface IInputProps extends InputHTMLAttributes<Ref> {
    label?: string;
}

const InputField = forwardRef<Ref,IInputProps>(({label,...props},ref) => {
    return (
        <>
            {label && <label htmlFor={props.id}>{label}</label>}
            <input
                ref={ref}
                {...props}
            />
        </>
    )
})

export default InputField