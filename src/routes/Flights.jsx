import React, {useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import AirplaneInFlight from '../assets/icons/AirplaneInFlight.svg'
function Flights(props) {
   
  const [steps, setStep] = useState({
    stpesCount: [1, 2, 3],
    currentStep: 2
})
    const location = useLocation()
    const {state} = location
    const carriers = state.json.dictionaries.carriers
    return (
    <div className='p-4 w-full grid gap-3'>
      {state?.json.data.map((flight)=> {
        const carrierName = flight.itineraries[0].segments[0].carrierCode
        const carrier = carriers[carrierName].split(" ")
        return(
      <div key={flight.id} className=' bg-white shadow  rounded-xl p-4 w-full h-max'>
        <div className='flex justify-between mb-4'>
          <div className='flex gap-2 items-center'>
          <h2 className=' text-md font-bold shadow border bg-white text-blue-600 capitalize'>{carrier[0].toLowerCase()}</h2>
          <h2 className='text-white text-xs'>IN 230</h2>
          </div>
          <h2 className='font-semibold text-gray-500 text-xs'> ({flight.itineraries[0].segments.length > 1 ?   flight.itineraries[0].segments.length-1 +' - Stop' : 'Non stop'}) {flight.itineraries[0].duration.substr(2)}</h2>
        </div>
        <div className='w-full items'>
          <div className='flex gap-2 w-full items-center'>
            <h3 className=''>{flight.itineraries[0].segments[0].departure.at.substr(11,5)}</h3>
            <div className="w-full mx-auto  px-4 sm:px-0">
            <div className='flex items-center justify-center gap-2'>
              <hr className='bg-black w-12' /> <img className='bg-primary p-2 rounded-full inve' src={AirplaneInFlight} alt="" />
              <hr className='bg-black w-12' />
            </div>
        </div>
            <h3 className=''>{flight.itineraries[0].segments[0].arrival.at.substr(11,5)}</h3>
          </div>
          <div className='flex justify-between'>
            <div>{flight.itineraries[0].segments[0].departure.iataCode}</div>
            <div>{flight.itineraries[0].segments[0].arrival.iataCode}</div>
          </div>
          
<div className={`w-full ${flight.itineraries[0].segments[1] ? '' : 'hidden'}`}>
          <div className='flex gap-2 w-full mt-4 items-center'>
            <h3 className=''>{flight.itineraries[0].segments[0].departure.at.substr(11,5)}</h3>
            <div className="w-full mx-auto  px-4 sm:px-0 mt-23">
            <div className='flex items-center justify-center gap-2'>
              <hr className='bg-black w-12' /> <img className='bg-primary p-2 rounded-full ' src={AirplaneInFlight} alt="" />
              <hr className='bg-black w-12' />
            </div>
        </div>
            <h3 className=''>{flight.itineraries[0].segments[0].arrival.at.substr(11,5)}</h3>
          </div>
          </div>


          <div className='flex justify-between'>
            <div>{flight.itineraries[0].segments[1]?.departure.iataCode}</div>
            <div>{flight.itineraries[0].segments[1]?.arrival.iataCode}</div>
          </div>
          <hr className='mt-2 mb-2' />
                <div className='flex justify-between text-gray-500'>
                  <h1>
                    {flight.travelerPricings[0].fareOption}
                  </h1>
                  <div className='flex gap-1'>From <h1 className='text-black font-bold'>${flight.price.total}</h1></div>
                </div>
        </div>
          <div className='justify-center flex  p-4'>
            <Link to={'/flightdetails'} state={{data:flight,carrier:carrier}} className='bg-primary text-white rounded-md w-full h-10'>
              Check
            </Link>
          </div>
      </div>
    )  
    })}
       
    </div>
  )
}

export default Flights
