import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { getDisplayName } from '../services/session'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function NavBar() {
  const [displayName, setDisplayName] = useState(null)

  useEffect(() => {
    const name = Cookies.get('displayName')
    name
      ? setDisplayName(name)
      : getDisplayName()
        .then((data) => {
          if (data !== null) {
            setDisplayName(data)
            Cookies.set('displayName', data, { expires: 1 })
          }
        })
  }, [])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">3books</Navbar.Brand>
        <Navbar.Text className="text-muted fst-italic">Because books matter</Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          <CheckName displayName={displayName} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function CheckName({ displayName }) {
  if (displayName) return <SignedIn displayName={displayName} />
  else return <SignedOut />
}

function SignedIn({ displayName }) {
  return (
    <Navbar.Text>
      Hello, <a href="#profile">{displayName}</a>
    </Navbar.Text>
  )
}

function SignedOut() {
  return <Nav.Link href="/api/auth/google">Sign in</Nav.Link>
}
