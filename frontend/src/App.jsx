import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import BookList from "./pages/BookList";

export default function App() {
  return (
    <>
      <CheckPage />
    </>
  );
}

function CheckPage() {
  if (window.location.href.includes("/u/")) return <BookList />;
  else return <Home />;
}
