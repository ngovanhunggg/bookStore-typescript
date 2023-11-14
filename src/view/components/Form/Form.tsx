import { FC,FormHTMLAttributes } from "react";
import FormInputField from "./FormInputField/FormInputFiled";
import FormSelect from './FormSelect/FormSelect'

type Ref = HTMLFormElement
interface IFormProps extends FormHTMLAttributes<Ref>{}

const Form:FC<IFormProps> = ({children,...props}) => {
    return (
        <form 
            {...props} 
        >
            {children} 
        </form>
    )
}
export  {Form,FormInputField,FormSelect}
