import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import BookList from "./pages/BookList";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { getNames } from "./services/user";

export default function App() {
  const [displayName, setDisplayName] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const displayName = Cookies.get("displayName");
    const username = Cookies.get("username");
    if (displayName && username) {
      setDisplayName(displayName);
      setUsername(username);
    } else {
      getNames().then((data) => {
        if (data !== null) {
          setDisplayName(data.displayName);
          setUsername(data.username);
          Cookies.set("displayName", data.displayName);
          Cookies.set("username", data.username);
        }
      });
    }
  }, []);

  return (
    <>
      <NavBar displayName={displayName} username={username} />
      <CheckPage username={username} />
    </>
  );
}

function CheckPage({ username }) {
  if (window.location.href.includes("/u/")) {
    return <BookList username={username} />;
  } else {
    return <Home />;
  }
}
