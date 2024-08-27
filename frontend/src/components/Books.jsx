import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getBooks } from "../services/book";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

export default function Books({ username }) {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    getBooks(username).then((data) => {
      if (data !== null) {
        setBooks(data);
      }
    });
  }, []);

  return <CheckBooks books={books} username={username} />;
}

function CheckBooks({ books, username }) {
  if (books === null) return <Loading />;
  else if (books.length === 0) return <NoBooks />;
  else return <BookList books={books} username={username} />;
}

function Loading() {
  return <p>Loading</p>;
}

function NoBooks() {
  return <p>No books</p>;
}

function BookList({ books, username }) {
  const bookList = books.map((book) => {
    return (
      <li key={book.isbn}>
        <Book book={book} username={username} />
      </li>
    );
  });

  return <ul style={{ listStyleType: "none", padding: 0 }}>{bookList}</ul>;
}

function Book({ book, username }) {
  const cover = book.cover ? book.cover : "../../static/grey.jpeg";

  return (
    <Container className="m-3 mx-auto">
      <Card>
        <Row>
          <Col className="d-flex justify-content-center">
            <Image
              src={cover}
              className="p-3"
              style={{ width: "196px", objectFit: "contain" }}
            />
          </Col>
          <Col xs={8} className="d-flex flex-column">
            <Card.Body>
              <Card.Title className="mb-0">{book.title}</Card.Title>
              <Card.Text className="text-muted fst-italic">
                {book.authors[0]}
              </Card.Text>
            </Card.Body>
            <CheckLogin username={username} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

function CheckLogin({ username }) {
  return username === Cookies.get("username") ? <EditButtons /> : null;
}

function EditButtons() {
  return (
    <div className="d-flex flex-row-reverse">
      <Button variant="danger">Delete</Button>
    </div>
  );
}
