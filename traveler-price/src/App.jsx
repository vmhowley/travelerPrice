import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'

function App() {
  const [count, setCount] = useState(0)
// useEffect(() => {
//   fetch('http://localhost:3000/api/flights/'
//   )
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error)  )
// },[])

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
