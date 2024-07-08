import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

const Books = ({ books }) => {
  console.log('BOOKS', books)
  const bookList = books.map((book) => {
    return (
      <li key={book.isbn}>
        <Book book={book} />
      </li>
    )
  })

  return (
    <ul style={{listStyleType: "none", padding: 0}}>
      {bookList}
    </ul>
  )
}

const Book = ({ book }) => {
  return (
    <Container className="m-3 mx-auto" style={{ width: "55%" }}>
      <Card>
        <Row>
          <Col className="d-flex justify-content-center">
            <Image src={book.cover} className="p-3" style={{ width: "196px", objectFit: "contain" }} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title className="mb-0">{book.title}</Card.Title>
              <Card.Text className="text-muted fst-italic" >{book.authors[0]}</Card.Text>
              <Card.Text>{book.description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>  
      </Card>
    </Container>
  )
}

export default Books