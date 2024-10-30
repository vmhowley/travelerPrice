import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowsDownUpIcon from '../assets/icons/ArrowsDownUp.svg'

function Home() {
  const [data, setData] = useState({})
  const [from, setFrom] = useState([])
  const [to, setTo] = useState([])
  const [open, setOpen] = useState(null)
  const [locations, setLocations] = useState([{}])
  const [keyword, setKeyword] = useState()

  const handleInput = (e) => {
    setData({ ...data, [e.currentTarget.name]: e.target.value })
    console.log(citySearch)
  }
  const handleFromTab = (e) => {
    document.querySelector('#from').focus()
    setOpen(!open)
    console.log('open')
  }
  const handleFrom = async (e) => {
    setKeyword(e.target.value)
    
    const url = `https://logged-gmbh-entering-totally.trycloudflare.com/api/citysearch?keyword=${e.target.value}`
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
    setKeyword(e.target.value)
    const url = `http://localhost:3000/api/citysearch?keyword=${e.target.value}`
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

  const handleSelection = (e) => {
    console.log(e)
    setLocations(e)
    setOpen(!open)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }
  return (
    <>
      <div className='p-4'>
        <div className=' shadow  rounded-full h-26 bg-white  flex justify-between text-gray-500 text-center mx-2 mb-6 '>
          <div className='bg-primary p-2 rounded-full w-full text-white'>
            One way
          </div>
          <div className=' p-2 rounded-full w-full'>Round</div>
          <div className=' p-2 rounded-full w-full'>Multicity</div>
        </div>
        <form
          className='bg-white p-4 shadow rounded-xl grid sm:flex gap-6 sm:gap-8 static'
        >
          <div
            className={`grid w-full relative `}
          >
            <div className='w-full relative'>
                <button type='button' onClick={handleFromTab} className={`w-full relative  ${open? 'z-0' : 'z-40'}   rounded-xl  border h-14 p-2 placeholder-gray-950 font-semibold text-left ps-6`}>
                  {locations.name }
                </button>
              <input
              
                className={`w-full  border h-14 p-2 placeholder-gray-950 font-semibold ps-8  ${
                  open ? 'fixed inset-0 sm:absolute rounded-xl    ' : 'rounded-xl  absolute left-0  '
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
                open ? 'fixed inset-0 sm:absolute sm:w-96 sm:h-96 z-50 ' : 'hidden '
              }`}
              name='from_country'
              onChange={handleInput}
            >
              <ul>
                {!from.code
                  ? from.map((location) => (
                      <div key={location.id}>
                        <li
                          onClick={() => {handleSelection(location)}}
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
          <div className='absolute right-6 top-12 z-30 sm:-right-9 sm:top-2'>
            <img
              className='w-max rounded-full p-2 border bg-white'
              src={ArrowsDownUpIcon}
              alt=''
              />
          </div>
              </div>
              <div className='w-full relative'>
                <button type='button' onClick={handleFromTab} className={`w-full relative  ${open? '' : 'z-40'}   rounded-xl  border h-14 p-2 placeholder-gray-950 font-semibold text-left ps-6`}>
                  {locations.name }
                </button>
              <input
                className={`w-full  border h-14 p-2 placeholder-gray-950 font-semibold ps-8 bg-black  ${
                  open ? 'fixed inset-0  sm:absolute rounded-xl hidden    ' : 'rounded-xl  absolute left-0 z-0 '
                } `}
                type='text'
                autoComplete="off"
                id='to'
                name='to'
                onChange={handleFrom}
              />
            </div>
            <section
              id='from_country'
              className={`border  bg-white top-14 ${
                open ? 'fixed inset-0 sm:absolute sm:w-96 sm:h-96 sm:z-50 ' : 'hidden '
              }`}
              name='from_country'
              onChange={handleInput}
            >
              <ul>
                {!to.code
                  ? to.map((location) => (
                      <div key={location.id}>
                        <li
                          onClick={() => {handleSelection(location)}}
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
          <div></div>
          <button type='submit'></button>
        </form>
      </div>
    </>
  )
}

export default Home
