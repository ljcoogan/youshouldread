import AddBook from "../components/AddBook";
import Books from "../components/Books";

export default function BookList() {
  const username = window.location.href.split("/u/")[1];

  return (
    <div>
      <AddBook />
      <Books username={username} />
    </div>
  );
}
