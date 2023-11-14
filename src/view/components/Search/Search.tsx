import React from "react";
import InputField from "../InputField/InputField";

// interface ISearchProps extends React.InputHTMLAttributes<HTMLInputElement>{}

// To drop some properties from the original, use Omit

// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };
// type Exclude<T, U> = T extends U ? never : T;



interface ISearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'type'> {}

    
const Search:React.FC<ISearchProps> = ({...props}) => {
    return (
        <InputField 
            type="search"
            {...props}
        />
    )
}

export default Search