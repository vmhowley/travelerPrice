import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import AirPlaneInFlightIcon from '../assets/icons/AirplaneInFlight.svg'
function FlightDetails() {
  const location = useLocation()
  const { state } = location
  const flight = state.data
  const carrier = state.carrier
  console.log(flight)
  return (
    <div className='p-4 w-full h-screen bg-blak'>
      <div className='rounded-xl h-80 shadow-xl '>
        <div className='grid  justify-center border h-20 content-center'>
        <h1 className='border p-2 text-blue-500 font-bold shadow capitalize'>{carrier[0].toLowerCase()}</h1>
        </div>
        <div className='flex gap-2 items-center p-4'>
          <div>
          <h1 className='font-bold text-xl'>{flight.itineraries[0].segments[0].departure.at.substr(11, 5)}</h1>
          <h1>
            {flight.itineraries[0].segments[0].departure.iataCode}
            </h1>
            <p>{''}</p>
          </div>
          <div className='flex items-center content-center justify-center w-full p-3'>
          <hr className='p-1 bg-gray-400 rounded-full'/>
          <hr className='w-full'/>
          <div className='p-1 bg-primary rounded-full'>
            <img className='w-20' src={AirPlaneInFlightIcon} alt="" />
          </div>
          <hr className='w-full'/>
          <hr className='p-1 bg-gray-400 rounded-full'/>
          </div>
          <div>
          <h1 className='font-bold text-xl'>{flight.itineraries[0].segments[0].arrival.at.substr(11, 5)}</h1>
          <h1>{flight.itineraries[0].segments[0].arrival.iataCode}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightDetails
