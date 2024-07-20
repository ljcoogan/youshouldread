import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

import { useState } from 'react'
import { getMetadata, postBook } from '../services/book'
import { getJsonFromForm } from '../services/form'

const modals = {
  none: 'none',
  manual: 'manual',
  add: 'add'
}

export default function AddBook() {
  const [modal, setModal] = useState(modals.none)
  const [book, setBook] = useState(null)
  const [isbn, setIsbn] = useState('')

  async function handleMetadata(e) {
    e.preventDefault()

    const json = getJsonFromForm(e)
    const metadata = await getMetadata(json.isbn)

    console.log('HERE', metadata)
    if (metadata !== null) {
      setBook(metadata)
      setModal(modals.add)
    } else {
      setModal(modals.manual)
    }
  }

  async function handleManual(e) {
    e.preventDefault()

    const json = getJsonFromForm(e)
    json.authors = json.authors.split(',')
    json.isbn = Number(isbn)
    setBook(json)
    setModal(modals.add)
  }

  async function handlePost() {
    postBook(book)
    setModal(modals.none)
    setIsbn('')
  }

  return (
    <>
      <AddContainer onSubmit={handleMetadata} isbn={isbn} setIsbn={setIsbn} />
      <CheckModal
        modal={modal}
        book={book}
        isbn={isbn}
        handleClose={() => setModal(modals.none)}
        handleManual={handleManual}
        handlePost={handlePost}
      />
    </>
  )
}

function AddContainer({ onSubmit, isbn, setIsbn }) {
  return (
    <Container className="m-3 mx-auto">
      <Card>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Add Book using ISBN</Form.Label>
              <Form.Control
                type="text"
                name="isbn"
                placeholder="9780123456789"
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
  if (isbn.length < 10) {
    return (
      <Button variant="secondary" disabled>
        Add Book
      </Button>
    )
  } else {
    return (
      <Button variant="success" type="submit">
        Add Book
      </Button>
    )
  }
}

function CheckModal({
  modal,
  book,
  isbn,
  handleClose,
  handleManual,
  handlePost
}) {
  console.log(modal)
  if (modal === modals.none) {
    return null
  } else if (modal === modals.manual) {
    return (
      <ManualAdd
        isbn={isbn}
        handleClose={handleClose}
        handleSubmit={handleManual}
      />
    )
  } else if (modal === modals.add) {
    return <Add book={book} handleClose={handleClose} handlePost={handlePost} />
  }
}

function ManualAdd({ isbn, handleClose, handleSubmit }) {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We're sorry, we can't obtain information on the provided ISBN. Please
          enter the information manually.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              aria-label="I S B N"
              value={isbn}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              aria-label="title"
              placeholder="The Hitchhiker's Guide to the Galaxy"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author(s)</Form.Label>
            <Form.Control
              type="text"
              name="authors"
              aria-label="authors"
              placeholder="Douglas Adams"
            />
            <Form.Text className="text-muted">
              If a book has multiple authors, separate them with commas.
            </Form.Text>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="success" type="submit" className="mt-3">
              Next
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

function Add({ book, handleClose, handlePost }) {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Cover book={book} />
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
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handlePost}>
          Add Book
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Cover({ book }) {
  if (book.cover) {
    return (
      <Col className="p-0 m-0">
        <img alt={`Cover for ${book.title}`} src={book.cover} />
      </Col>
    )
  } else return null
}
