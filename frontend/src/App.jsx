import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

import AddBook from './components/AddBook'
import Books from './components/Books'

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [books, setBooks] = useState([])

  // get books from server when page is initially loaded
  useEffect(() => {
    const initialBooks = async () => {
      setBooks(await getBooks())
      setLoaded(true)
    }
    initialBooks()
  }, [])
  
  const addBook = (book) => {
    setBooks([book, ...books])
  }

  if(!loaded) return null

  return (
    <>
      <AddBook addBook={addBook}/>
      <Books books={books}/>
    </>
  )
}

const getBooks = async () => {
  const books = await axios.get('http://localhost:3000/api/book')
  return books.data
}

export default App
