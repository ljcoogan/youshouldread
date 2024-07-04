import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const AddBook = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
        Add book
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
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
    </>
  )
}

export default AddBook