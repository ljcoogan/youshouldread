import { useEffect, useState } from 'react'
import { getBooks } from '../services/book'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

export default function Books() {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    getBooks().then((data) => {
      if (data !== null) {
        setBooks(data)
      }
    })
  }, [])

  return <CheckBooks books={books} />
}

function CheckBooks({ books }) {
  if (books === null) return <Loading />
  else if (books.length === 0) return <NoBooks />
  else return <BookList books={books} />
}

function Loading() {
  return <p>Loading</p>
}

function NoBooks() {
  return <p>No books</p>
}

function BookList({ books }) {
  console.log(books)
  const bookList = books.map((book) => {
    return (
      <li key={book.isbn}>
        <Book book={book} />
      </li>
    )
  })

  return <ul style={{ listStyleType: 'none', padding: 0 }}>{bookList}</ul>
}

function Book({ book }) {
  const cover = book.cover
    ? book.cover
    : '../../static/grey.jpeg'

  console.log('BOOK', book)
  
  return (
    <Container className="m-3 mx-auto">
      <Card>
        <Row>
          <Col className="d-flex justify-content-center">
            <Image
              src={cover}
              className="p-3"
              style={{ width: '196px', objectFit: 'contain' }}
            />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title className="mb-0">{book.title}</Card.Title>
              <Card.Text className="text-muted fst-italic">
                {book.authors[0]}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
