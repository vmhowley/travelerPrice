import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import Flights from './routes/Flights'
import FlightDetails from './routes/FlightDetails'
import TopBar from './components/topbar/TopBar'
import NavBar from './components/navbar/NavBar'

function App() {

  return (
    <>
    <Router>
      <TopBar/>
        <div className='mb-20  pb-20'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/flights' element={<Flights/>}/>
        <Route path='/flightdetails' element={<FlightDetails/>}/>
      </Routes>
        </div>
    </Router>
    </>
  )
}

export default App
