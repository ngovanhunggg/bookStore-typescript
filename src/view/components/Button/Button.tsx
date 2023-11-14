import React from "react"

// interface IButtonProps {
//     onClick?: () => void;
//     props? : any 
//     children: string
// }
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button:React.FC<IButtonProps> = ({onClick,children,...props}) => {
    return (
        <button
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button