import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import axios from 'axios'
import { useState, useEffect } from 'react'

const postBookByIsbn = async () => {
  const formData = new FormData(e.target)
  const json = Object.fromEntries(formData.entries())
  
  const response = await axios
    .post(`http://localhost:3000/api/book/isbn/${json.isbn.toString()}`, json, {
      headers: {
      'Content-Type': 'application/json'
      }
    })

  console.log(response.json())
}

const AddBookByIsbn = () => {
  const [isbn, setIsbn] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Container className="mt-3">
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
              <AddButton 
                isbn={isbn}
              />
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

export default AddBookByIsbn