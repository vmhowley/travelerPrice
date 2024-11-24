import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import AirPlaneInFlightIcon from '../assets/icons/AirplaneInFlight.svg'
function FlightDetails() {
  const location = useLocation()
  const { state } = location
  const flight = state.flight
  const carrier = state.carrier
  const from = state.from
  const to = state.to
  const data = state.data
  console.log(state)
  return (
    <div className='p-4 w-full h-screen '>
      <div className='rounded-xl pb-4 shadow-xl '>
        <div className='grid  justify-center border h-20 content-center'>
        <h1 className='border p-2 text-blue-500 font-bold shadow capitalize'>{carrier[0].toLowerCase()}</h1>
        </div>
        <div className='flex p-4'>
          <div className='relative w-40  top-4 '>
          <h1 className='font-bold text-xl'>{flight.itineraries[0].segments[0].departure.at.substr(11, 5)}</h1>
          <h1>
            {flight.itineraries[0].segments[0].departure.iataCode}
            </h1>
            <p className='text-xs text-muted-foreground'>{from.address.cityName}</p>
            </div>
          <div className='flex  w-full items-center  justify-center  p-3'>
          <hr className='p-1 bg-gray-400 rounded-full'/>
          <hr className='w-full'/>
          <div className='p-1 bg-primary rounded-full'>
            <img className='w-20 invert' src={AirPlaneInFlightIcon} alt="" />
          </div>
          <hr className='w-full'/>
          <hr className='p-1 bg-gray-400 rounded-full'/>
          </div>
          <div className='relative w-40 top-4 '>
          <h1 className='font-bold text-xl'>{flight.itineraries[0].segments[0].arrival.at.substr(11, 5)}</h1>
          <h1>{flight.itineraries[0].segments[0].arrival.iataCode}</h1>
          <p className='text-xs text-muted-foreground'>{to.address.cityName}</p>
          </div>
        </div>
        <div className='p-4 gap-6 grid'>
          {/* <hr />
          <div className='flex justify-between'>
            <input value={data?.departure_date} type="date" className='border p-2 rounded-md h-12  bg-transparent text-center' disabled/>
            <input type="time" value={'16:00'} className=' border p-2 rounded-md h-12 bg-transparent text-center' readOnly />
          </div> */}
          <hr />
          <div className='w-full relative top-2 flex justify-center text-center items-center content-center'>
            <h1 className='text-xl'>Price:</h1>
            <p className='font-bold text-2xl'>{flight.price.grandTotal}</p>
          </div>
        </div>
      </div>
      <div className='justify-center flex  p-4 gap-4'>
        <Link to={'/flights'} className='border border-primary text-primary rounded-md w-full h-12 text-center content-center font-bold '>
          Cancel
        </Link>
        <Link to={'/flights'} className='bg-primary text-white rounded-md w-full h-12 text-center content-center font-bold '>
          Confirm
        </Link>

    </div>
    </div>
  )
}

export default FlightDetails
