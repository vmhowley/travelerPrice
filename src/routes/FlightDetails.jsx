import React from 'react'
import { useLocation, Link } from 'react-router-dom'
function FlightDetails() {
  const location = useLocation()
  const { state } = location
  const flight = state.data
  const carrier = state.carrier
  console.log(carrier)
  return (
    <div className='p-4 w-full h-screen bg-blak'>
      <div className='grid justify-center bg-black/30 h-80  rounded-xl shadow-xl p-4'>
        <h1>sdfsdf</h1>
      </div>
    </div>
  )
}

export default FlightDetails
