import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

import axios from 'axios'
import { useState } from 'react'

function getJsonFromForm(e) {
  const formData = new FormData(e.target)
  return Object.fromEntries(formData.entries())
}

export default function AddBook({ addBook }) {
  const [showModal, setShowModal] = useState(false)
  const [book, setBook] = useState({ isbn: 0 })

  async function getMetadata(e) {
    e.preventDefault()

    const json = getJsonFromForm(e)

    const metadata = await getMetadataFromIsbn(json.isbn)
    setBook(metadata)
    setShowModal(true)
  }

  async function getMetadataFromIsbn(isbn) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/book/gbooks/${isbn}`
      )
      console.log(response.data)
      return response.data
    } catch (err) {
      return {
        isbn: Number(isbn)
      }
    }
  }

  function closeModal() {
    setShowModal(false)
  }

  async function autoPost() {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/book/isbn/${book.isbn}`,
        book
      )
      addBook(response.data)
    } catch (err) {
      console.log(err)
    }
    closeModal()
  }

  async function manualPost(json) {
    try {
      const response = await axios.post('http://localhost:3000/api/book', json)
      addBook(response.data)
    } catch (err) {
      console.log(err)
    }
    closeModal()
  }

  return (
    <>
      <AddContainer onSubmit={getMetadata} />
      <AddModal
        show={showModal}
        book={book}
        handleClose={closeModal}
        autoPost={autoPost}
        manualPost={manualPost}
      />
    </>
  )
}

function AddContainer({ onSubmit }) {
  const [isbn, setIsbn] = useState('')
  return (
    <Container className="m-3 mx-auto" style={{ width: '55%' }}>
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

function AddButton({ isbn }) {
  return isbn.length < 10 ? (
    <Button variant="secondary" disabled>
      Add Book
    </Button>
  ) : (
    <Button variant="success" type="submit">
      Add Book
    </Button>
  )
}

function AddModal({ show, book, handleClose, autoPost, manualPost }) {
  const submitManual = async (e) => {
    e.preventDefault()
    handleClose()

    const json = getJsonFromForm(e)
    json.authors = json.authors.split(',')
    json.isbn = book.isbn

    manualPost(json)
  }

  // check if book title has been filled
  // if so, show modal for automatic add
  // else, show modal for manual add
  return book.title ? (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col className="p-0 m-0">
              <img alt={`Cover for ${book.title}`} src={book.cover} />
            </Col>
            <Col xs={8} className="p-0 m-0">
              <p>
                <b>Title:</b> {book.title}
              </p>
              <p>
                <b>Author(s):</b> {book.authors}
              </p>
              <p>
                <b>ISBN:</b> {book.isbn}
              </p>
              <p>
                <b>Description:</b> {book.description}
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={autoPost}>
          Add Book
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We're sorry, we can't obtain information on the provided ISBN. Please
          enter the information manually.
        </p>
        <Form onSubmit={submitManual}>
          <Form.Group className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="number"
              name="isbn"
              value={book.isbn}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="The Hitchhiker's Guide to the Galaxy"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author(s)</Form.Label>
            <Form.Control
              type="text"
              name="authors"
              placeholder="Douglas Adams"
            />
            <Form.Text className="text-muted">
              If a book has multiple authors, separate them with commas.
            </Form.Text>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="success" type="submit" className="mt-3">
              Add Book
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
