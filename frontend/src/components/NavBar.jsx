import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getDisplayName, signOut } from "../services/user";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar({ changePage }) {
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const name = Cookies.get("displayName");
    name
      ? setDisplayName(name)
      : getDisplayName().then((data) => {
          if (data !== null) {
            setDisplayName(data);
            Cookies.set("displayName", data);
          }
        });
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#" onClick={() => changePage("home")}>
          3books
        </Navbar.Brand>
        <Navbar.Text className="text-muted fst-italic">
          Because books matter
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          <CheckName displayName={displayName} changePage={changePage} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function CheckName({ displayName, changePage }) {
  if (displayName)
    return <SignedIn displayName={displayName} changePage={changePage} />;
  else return <SignedOut />;
}

function SignedIn({ displayName, changePage }) {
  return (
    <>
      <Navbar.Text>
        Hello,{" "}
        <a href="#" onClick={() => changePage("bookList")}>
          {displayName}
        </a>
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
