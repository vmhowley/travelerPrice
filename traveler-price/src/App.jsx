import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import TopBar from './components/topbar/TopBar'
import NavBar from './components/navbar/NavBar'

function App() {

  return (
    <>
    <Router>
      <TopBar/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
