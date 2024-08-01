import NavBar from "../components/NavBar";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

export default function Home() {
  return (
    <>
      <NavBar />
      <div style={{ position: "fixed" }}>
        <Image src="../../static/home-bg.jpg" alt="Books" fluid />
        <Card
          variant="info"
          style={{
            width: "18rem",
            position: "fixed",
            top: "20vh",
            left: "39vw",
          }}
        >
          <Card.Body>
            <Card.Title>3books</Card.Title>
            <Card.Text>
              3books lets you share the books that mean the most to you.
            </Card.Text>
            <Card.Text>
              Add your favourite books, and get a link to share with your
              friends.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
