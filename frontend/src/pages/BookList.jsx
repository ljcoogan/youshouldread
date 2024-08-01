import AddBook from "../components/AddBook";
import Books from "../components/Books";
import NavBar from "../components/NavBar";

export default function BookList() {
  const username = window.location.href.split("/u/")[1];

  return (
    <div>
      <NavBar />
      <AddBook />
      <Books username={username} />
    </div>
  );
}
