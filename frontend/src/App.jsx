import axios from 'axios'

import AddBook from './components/AddBook'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const json = Object.fromEntries(formData.entries())
    json.isbn = json.isbn.toString()
    
    const response = await axios
      .post('http://localhost:3000/api/book/', json, {
        headers: {
        'Content-Type': 'application/json'
        }
      })

    console.log(response)
  }

  return (
    <>
      <AddBook 
        onSubmit={onSubmit}
      />
    </>
  )
}

export default App
