import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

import axios from 'axios'
import { useState } from 'react'

const AddBookByIsbn = () => {
  const [showModal, setShowModal] = useState(false)
  const [book, setBook] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const json = Object.fromEntries(formData.entries())
    const isbn = json.isbn.toString()

    const metadata = await getMetadataFromIsbn(isbn)
    setBook(metadata)
    setShowModal(true)
  }

  const getMetadataFromIsbn = async (isbn) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/book/gbooks/${isbn}`)
      console.log(response.data)
      return response.data
    } catch (err) {
      return null
    }
  }

  return (
    <>
      <AddContainer onSubmit={onSubmit} />
      <BookModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        book={book}
      />
    </>
  )
}

const AddContainer = ({ onSubmit }) => {
  const [isbn, setIsbn] = useState('')
  return (
    <Container className="mt-3" style={{ width: "50vw" }}>
      <Card>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Add Book using ISBN</Form.Label>
              <Form.Control 
                type="text" 
                name="isbn" 
                placeholder="9781529034523"
                aria-label="I S B N"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
              <Form.Text className="text-muted">
                You can find this on the back of your book, above the barcode.
              </Form.Text>
            </Form.Group>
            <div className="d-grid gap-2">
              <AddButton isbn={isbn} />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

const AddButton = ({ isbn }) => {
  return isbn.length < 10
    ? <Button variant="secondary" disabled>Add Book</Button>
    : <Button variant="success" type="submit">Add Book</Button>
}

const BookModal = ({ show, handleClose, book }) => {
  const add = () => {}
  return book
    ? (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <img alt={`Cover for ${book.title}`} src={book.cover} />
              </Col>
              <Col xs={8}>
                <p><b>Title:</b> {book.title}</p>
                <p><b>Author(s):</b> {book.authors}</p>
                <p><b>ISBN:</b> {book.isbn}</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={add}>Add Book</Button>
        </Modal.Footer>
      </Modal>
    )
    : (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We're sorry, we can't obtain information on the provided ISBN. Please enter the information manually.</p>
          <Form onSubmit={add}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="The Hitchhiker's Guide to the Galaxy" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" placeholder="Douglas Adams" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" name="isbn" placeholder="9781529034523" />
              <Form.Text className="text-muted">
                You can find this on the back of your book, above the barcode.
              </Form.Text>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
              variant="success" 
              type="submit" 
              className="justify-content-end mt-3"
              >
                Add Book
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
}

export default AddBookByIsbn