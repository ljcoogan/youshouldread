import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'

import NavBar from './components/NavBar'

import Home from './pages/Home'
import BookList from './pages/BookList'

export default function App() {
  const pages = {
    home: 'home',
    bookList: 'bookList'
  }

  const [page, setPage] = useState(pages.home)

  function changePage(page) {
    setPage(page)
  }

  return (
    <>
      <NavBar changePage={changePage} />
      <CheckPage page={page} pages={pages} />
    </>
  )
}

function CheckPage({ page, pages }) {
  if (page === pages.home) return <Home />
  else if (page === pages.bookList) return <BookList />
}
