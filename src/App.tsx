import React, { useReducer, useState ,useRef, useMemo } from 'react'
import './App.css'
import useLocalStorage from './utils/hooks/useLocalStorage'
import Header from './view/components/Header/Header'
import Button from './view/components/Button/Button'
import Search from './view/components/Search/Search'
import Table from './view/components/Table/Table'
import {Form,FormInputField,FormSelect} from './view/components/Form/Form'
import { LocalStorageContext } from './utils/context/LocalStorageContext'

import { Book,Books,IShowModal,IHandleModal } from './interfaces'
import Modal from './view/components/Modal/Modal'
import Pagination from './view/components/Pagination/Pagination'

const {log} = console

let id:number = 0;
const initBooks:Books = [];

// Defind kind of actions  
// Enums allow a developer to define a set of named constants.
enum ActionKind {
  ADDBOOK = 'ADDBOOK',
  DELETEBOOK = 'DELETEBOOK',
}

// function add book into dataBooks
const addBook = (title:string,author:string,topic:number):void => {
  // define the book with Book type
    const book:Book = {
      id:++id,
      title,
      author,
      topic
    }
  // add book to dataBooks
  initBooks.push(book);
}

addBook("Refactoring", "Martin Fowler", 0);
addBook("Design Data-Intensive Application", "Martin Kleppmann", 1);
addBook("The Phoenix Project", "Gene Kim", 2);
for (let i = 0; i < 30; i++) {
  addBook(`Refac-${i + 1}`, "Martin Fowler", 0);
}

interface IActionReducer {
  type: ActionKind;
  payload: {book?:Book,books?:Books};

  // updateData: (books:Books) => void;
}

function reducer(state:Books,action:IActionReducer) {
  let newBooks:Books = [];
  const {type, payload} = action;
  const {book, books} = payload;
  switch (type) {
    case ActionKind.ADDBOOK:
      if(book)
      newBooks = [...state,book];
      return newBooks;
    case ActionKind.DELETEBOOK:
      return books || []
    default:
      return state
  }
}

const App:React.FC = () => {
  const {data,setData} = useLocalStorage()

  const [books,dispatchBooks] = useReducer(reducer,data && data.books || initBooks)
  const [showModal,setShowModal] = useState<IShowModal>({show:false,modal:'add'})
  const [titleBook,setTitleBook] = useState<string>('');
  const [titleErr,setTitleErr] = useState<string>('');
  const [author,setAuthor] = useState<string>('');
  const [authorErr,setAuthorErr] = useState<string>('');
  const [topic,setTopic] = useState<number>(0);
  const [textSearch,setTextSearch] = useState<string>('');
  const [pageCurrent,setPageCurrent] = useState<number>(data?.currentPage ? data.currentPage : 0);
  const booksPerpage:number = 5 ;

  // Check title and author 

  log(data?.currentPage,pageCurrent)
  const idDelete = useRef<number>(NaN)

  const showWrap = showModal.show;
  let booksRender:Books=books 
  const booksRenderFollowPage:Books = [];

  const dataLocalStorage = useMemo(() => {
    return {data,setData}
  },[data,setData])
  log(dataLocalStorage)


  // Get books follow text search
  if(textSearch){
     booksRender = books.filter(b => b.title?.toLowerCase().includes(textSearch.toLowerCase()))
  }
  // Get books follow page 
  for(let i = pageCurrent * booksPerpage;i < pageCurrent * booksPerpage + booksPerpage;i++) {
    if(booksRender[i])
    booksRenderFollowPage.push(booksRender[i])
  }

  // Calculate the number of pages : pageCount
  const pageCount:number = Math.ceil(booksRender.length / booksPerpage)
  // Check if the current page is greater than the number of existing pages 
  const check:boolean = pageCurrent > 0 && pageCurrent >= pageCount;
  if(check){
    setPageCurrent(pageCurrent - 1)
  }

  log('App-render')

  // Find book with id to delete
  const bookDelete = books.find(b => b.id === idDelete.current)

  

  // Function Event
  // Function Update data LocalStorage 
  const updateData = (books:Books) => {
    // log(books)
    setData({...data,books})
  }

  function handleModal({modal,show=true,id}:IHandleModal):void {
    const setModal:IShowModal = {
      modal,
      show
    }

    if(id && modal === 'delete' && show) 
      idDelete.current = id;

    setShowModal(setModal)
    setTitleBook('')
    setAuthor('')
    setTitleErr('')
    setAuthorErr('')
  }
  function createBook(e:React.MouseEvent<HTMLButtonElement>):void {
    e.preventDefault();
    const d = new Date();
    const newBook:Book = {
      id: d.getTime(),
      title: titleBook,
      author,
      topic
    }
    if(titleBook.trim() && author.trim()) {
      dispatchBooks({
        type: ActionKind.ADDBOOK,
        payload : {book:newBook},
      })
      updateData([...books,newBook])
      setShowModal({
        show: false
      })
    }else {
      setTitleErr(validator(titleBook,'Title book cannot be empty'))
      setAuthorErr(validator(author,'Author cannot be empty'))
    }
    
  }
  function handleDeleteBook():void {
    const newBooks = books.filter(b => b.id !== idDelete.current)
    dispatchBooks({
      type: ActionKind.DELETEBOOK,
      payload: {
        books:newBooks
      },
    })
    updateData(newBooks)
    setShowModal({
      show: false
    })
  }

  function handleChangePage(page:number):void {
    setPageCurrent(page)
    setData({...data,currentPage:page})
  }

  function validator(textValue:string,messErr:string) {
    return textValue.trim() !== '' ? '' : messErr
  }
  return (
   <>
    <div id="toast" />
    <div 
      className={showWrap ? 'wrap show' : 'wrap'}
      onClick={() => handleModal({show:false})}
      aria-hidden
    />

    {/* Header */}
    <LocalStorageContext.Provider value={dataLocalStorage}>
      <Header/>
    </LocalStorageContext.Provider>
    

    {/* Main */}
    <main>
      <div className="container">
        {/* Form search */}
        <div className="search_books">
          <div className="form">
            <Search
              id='search_books'
              className='form_control'
              placeholder='Search books'
              value={textSearch}
              onChange={(e) =>{
                setTextSearch(e.target.value);
                handleChangePage(0)
              }}
            />
            <Button 
              id='add_book'
              className='form_submit'
              onClick={() => handleModal({modal:'add'})}
            >
              Add book
            </Button>
          </div>
        </div>

        {/* Modal create book */}
        <section
          className={showModal.modal === 'add' && showModal.show ? 'box-modal show' : 'box-modal'}
        > 
          <Modal
            title='Add Book'
            closeModal= {() => handleModal({modal:'add',show:false})}
          >
              <Form action='#'>
                <FormInputField
                  id='name'
                  label='Name'
                  value={titleBook}
                  messErr = {titleErr}
                  onChange={(e) => {
                    setTitleBook(e.target.value)
                    setTitleErr(validator(e.target.value,'Title book cannot be empty'))
                  }}
                />
                <FormInputField
                  id='author'
                  label='Author'
                  value={author}
                  messErr = {authorErr}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                    setAuthorErr(validator(e.target.value,'Author cannot be empty'))
                  }}
                />
                <FormSelect
                  id='topic'
                  label='Topic'
                  value={topic}
                  onChange={(e) => setTopic(Number(e.target.value))}
                />
                <Button
                  id='create'
                  className='form_submit'
                  onClick={(e) => createBook(e)}
                >
                  Create
                </Button>
            </Form>
          </Modal>
        </section>
        {/* Modal delete book */}
        <section 
          id='delete-book-modal'
          className={showModal.modal === 'delete' && showModal.show ? 'box-modal show' : 'box-modal'}
        >
          <Modal
            title='Delete Book'
            closeModal={() => handleModal({modal:'delete',show:false})}
          >
            <p>
              Do you want to delete{" "}
              <b id="title_book">{bookDelete ? bookDelete.title : ""}</b> book?
            </p>
            <div className="btn">
              <button 
                id="remove" className="form_submit"
                onClick={() => handleDeleteBook()}
              >
                Delete
              </button>
              <button 
                id="cancel" className="form_submit"
                onClick={() => handleModal({show: false})}
              >
                Cancel
              </button>
            </div>
          </Modal>
        </section> 
        {/* Table show list books */}
        
        <div className="table">
            <Table
              books={booksRenderFollowPage}
              handleClick={({...rest}) => handleModal({...rest})}
            />
        </div>

        <Pagination
          pageCount={pageCount}
          pageCurrent={pageCurrent}
          pageSpace={3}
          handleClick={(page) => handleChangePage(page)}
        />
        {/* Modal Add Book */}
      </div>
    </main>
   </>
  )
}

export default App
