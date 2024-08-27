import { signOut } from "../services/user";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar({ displayName, username }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">3books</Navbar.Brand>
        <Navbar.Text className="text-muted fst-italic">
          Because books matter
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          <CheckName displayName={displayName} username={username} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function CheckName({ displayName, username }) {
  if (displayName)
    return <SignedIn displayName={displayName} username={username} />;
  else return <SignedOut />;
}

function SignedIn({ displayName, username }) {
  return (
    <>
      <Navbar.Text>
        Hello, <a href={`/u/${username}`}>{displayName}</a>
      </Navbar.Text>
      <Button className="ms-3" variant="outline-dark" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
}

function SignedOut() {
  return (
    <Button variant="outline-dark" href="/api/auth/google">
      Sign in
    </Button>
  );
}
