import { FC, ReactNode } from 'react'
import '../../../assets/style/Modal.css'

// rafce :react arrow function component export
// tsrafce : typescript .....
interface IModal {
    title?:string;
    children?:ReactNode;
    closeModal?: React.MouseEventHandler<HTMLButtonElement>;
}
const Modal:FC<IModal> = ({title,children,closeModal}) => {
  return (
    <div className="modal">
        <div className="modal_header">
            <h2>{title}</h2>
            <span 
                className='close'
                onClick={closeModal}  aria-hidden="true"
            >
                &times;
            </span> 
        </div>
        <div className="modal_body">{children}</div>
    </div> 
  )
}

export default Modal