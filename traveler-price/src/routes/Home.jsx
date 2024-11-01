import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowsDownUpIcon from '../assets/icons/ArrowsDownUp.svg'
import AirplaneInFlightIcon from '../assets/icons/AirplaneInFlight.svg'
import AirplaneLandingIcon from '../assets/icons/AirplaneLanding.svg'
function Home() {
  const [data, setData] = useState({});
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [openFrom, setOpenFrom] = useState(null);
  const [openTo, setOpenTo] = useState(null);
  const [locationFrom, setLocationFrom] = useState([{}]);
  const [locationTo, setLocationTo] = useState([{}]);

  window.addEventListener('keydown', (event) => {
    console.log(event.code)
    if (event.code === 'Escape') {
      setOpenFrom(false)
      setOpenTo(false)
    }
  });

  const handleInput = (e) => {
    setData({ ...data, [e.currentTarget.name]: e.target.value })
  }
  const handleFromTab = (e) => {
    document.querySelector('#from').focus()
    setOpenFrom(!openFrom)
    console.log('open')
  }
  const handleToTab = (e) => {
    document.querySelector('#to').focus()
    setOpenTo(!openTo)
    console.log('open')
  }
  const handleFrom = async (e) => {
    
    const url = `https://ali-consistency-panama-strip.trycloudflare.com/api/citysearch?keyword=${e.target.value}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json()
      if (!json.code) {
        setFrom(json)
        console.log(json)
      } else {
        setFrom(json)
        console.log(json)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleTo = async (e) => {
    const url = `https://ali-consistency-panama-strip.trycloudflare.com/api/citysearch?keyword=${e.target.value}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json()
      if (!json.code) {
        setTo(json)
        console.log(json)
      } else {
        setTo(json)
        console.log(json)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleSelection = (e,locations) => {
    console.log(e)
    if (e === 'from'){

      setLocationFrom(locations)
      document.querySelector('#from').value = ' '
      setOpenFrom(!openFrom)
      setData(
        {
         ...data,
          [e]: locations
        }
      )
      
    }else if (e === 'to'){
      setLocationTo(locations)
      document.querySelector('#to').value = ' '
      setOpenTo(!openTo)
      setData(
        {
         ...data,
          [e]: locations
        }
      )
  }
  
}
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }
  return (
    <>
      <div className='w-full p-4 '>
        <div className=' shadow  rounded-full h-26 bg-white  flex justify-between text-gray-500 text-center mx-2 mb-6 '>
          <div className='bg-primary p-2 rounded-full w-full text-white'>
            One way
          </div>
          <div className=' p-2 rounded-full w-full'>Round</div>
          <div className=' p-2 rounded-full w-full'>Multicity</div>
        </div>
        <form
        onSubmit={handleSubmit}
          className=' p-4 shadow bg-white rounded-xl grid sm:flex gap-6 sm:gap-8 relative'
        >
          <div className={`grid w-full relative `}>
            <div className=' relative'>
            <button type='button' onClick={handleFromTab} className={`w-full relative flex gap-4 items-center  ${openFrom? 'z-0' : 'z-30'}   rounded-xl  border h-14 p-2 placeholder-gray-950 font-semibold text-left ps-6`}>
                  <img src={AirplaneInFlightIcon} alt="" />
                  <div>
                  <h1>{locationFrom.address ? locationFrom.address.cityName : 'Leaving from' }</h1>
                  <p className='font-light text-xs'>{locationFrom.name || ''} - {locationFrom.iataCode}</p>
                  </div>
                </button>
              <input
              
                className={`w-full  border h-14 p-2 placeholder-gray-950 font-semibold ps-8  ${
                  openFrom ? 'fixed inset-0 sm:absolute rounded-xl    ' : 'rounded-xl absolute  left-0 top-0  '
                } `}
                type='text'
                id='from'
                name='from'
                autoComplete="off"
                
                onChange={handleFrom}
                
              />
            </div>
            <section
              id='from_country'
              className={`border  bg-white top-14 ${
                openFrom ? 'fixed inset-0 sm:absolute sm:w-96 sm:h-96 z-50 ' : 'hidden '
              }`}
              name='from_country'
              onChange={handleInput}
            >
              <ul>
                {!from.code
                  ? from.map((location) => (
                      <div key={location.id}>
                        <li
                          onClick={() => {handleSelection('from',location)}}
                          key={location.id}
                          value={location.name}
                          className='capitalize cursor-pointer rounded-xl p-2'
                        >
                          {location.address.cityName.toLowerCase()} (
                          {location.name.toLowerCase()} - {location.iataCode})
                        </li>
                      </div>
                    ))
                  : ''}
              </ul>
            </section>
            </div>
          <div className='absolute z-40 bg-white w-max top-16 right-6  rounded-full '>
            <img
              className='border rounded-full p-2'
              src={ArrowsDownUpIcon}
              alt=''
              />
              </div>
              <div className='w-full relative'>
              <div className='w-full relative'>
                <button type='button' onClick={handleToTab} className={`w-full relative flex gap-4 items-center  ${openTo? 'z-0' : 'z-30'}   rounded-xl  border h-14 p-2 placeholder-gray-950 font-semibold text-left ps-6`}>
                  <img src={AirplaneLandingIcon} alt="" />
                  <div>
                  <h1>{locationTo.address ? locationTo.address.cityName :'Going To' }</h1>
                  <p className='font-light text-xs'>{locationTo.name || ''} - {locationTo.iataCode}</p>
                  </div>
                </button>
              <input
              
                className={`w-full  border h-14 p-2 placeholder-gray-950 font-semibold ps-8  ${
                  openTo ? 'fixed inset-0 sm:absolute rounded-xl    ' : 'rounded-xl absolute  left-0 top-0  '
                } `}
                type='text'
                id='to'
                name='to'
                autoComplete="off"
                
                onChange={handleTo}
                
              />
            </div>
            </div>
            <section
              id='to_country'
              className={`border  bg-white top-14 ${
                openTo ? 'fixed inset-0 sm:absolute sm:w-96 sm:h-96 z-50 ' : 'hidden '
              }`}
              name='to_country'
              onChange={handleInput}
            >
              <ul>
                {!to.code
                  ? to.map((location) => (
                      <div key={location.id}>
                        <li
                          onClick={() => {handleSelection('to',location)}}
                          key={location.id}
                          value={location.name}
                          className='capitalize cursor-pointer rounded-xl p-2'
                        >
                          {location.address.cityName.toLowerCase()} (
                          {location.name.toLowerCase()} - {location.iataCode})
                        </li>
                      </div>
                    ))
                  : ''}
              </ul>
            </section>
          <div className='flex justify-between  '>
            <div className='relative border rounded w-max '>
              <span className='absolute -top-3 p-1 text-gray-500 text-xs bg-white'>Departure</span>
              <input onChange={handleInput} id='departure_date' name='departure_date' className='py-3 px-2' type='date' />
            </div>
            <div className='relative border rounded w-max'>
            <span className='absolute -top-3 p-1 text-gray-500 text-xs bg-white'>Return</span>

              <input onChange={handleInput} id='return_date' name='return_date' className=' py-3 px-2 rounded' type='date' />
            </div>
          </div>
          <button className='bg-primary rounded h-12 text-white font-semibold' type='submit'>Search</button>
        </form>
      </div>
    </>
  )
}

export default Home
