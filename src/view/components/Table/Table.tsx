import React from "react"
import { Books, ITopic,IHandleModal } from "../../../interfaces"
import Button from "../Button/Button";
import '../../../assets/style/Table.css'

// const {log} = console
export const topics:ITopic = {
  0: "Programming",
  1: "Databases",
  2: "DevOps",
};
interface ITable {
    books:Books;
    handleClick: ({...rest}: IHandleModal) => void;
}

const Table:React.FC<ITable> = ({books,handleClick}) => {
    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Topic</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map(b => (

                    <tr key={`row-${b.id}`}>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.topic !== undefined && topics[b.topic]}</td>
                        <td>
                            <Button
                                id="delete-book"
                                onClick={() => handleClick({
                                    modal: 'delete',
                                    id: b.id,
                                })}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    )
}

export default Table