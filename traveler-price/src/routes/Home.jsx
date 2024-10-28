import React, { useState } from 'react'

function Home() {
    const [data, setData] = useState({})
    const [from, setFrom] = useState([])
    const [to, setTo] = useState([])
    const [locations, setLocations] = useState()
    const [keyword, setKeyword] = useState()
  
    const handleInput = (e) => {
        setData({...data, [e.currentTarget.name]: e.target.value})
        console.log(citySearch)
    }

    const handleFrom = async (e) => {
      setKeyword(e.target.value)
      const url = `http://localhost:3000/api/citysearch?keyword=${e.target.value}`
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const json = await response.json();
          if (!json.code){
            setFrom(json)
            console.log(json)
          }else{
            setFrom(json)
            console.log(json)
          }
        } catch (error) {
          console.error(error.message);
        }
        
      }
    const handleTo = async (e) => {
      setKeyword(e.target.value)
      const url = `http://localhost:3000/api/citysearch?keyword=${e.target.value}`
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const json = await response.json();
          if (!json.code){
            setTo(json)
            console.log(json)
          }else{
            setTo(json)
            console.log(json)
          }
        } catch (error) {
          console.error(error.message);
        }
        
      }
  return (
<>
<div className="min-h-screen bg-gray-100 p-4">
      <div className="flex mb-6 relative justify-center">
        <div className=''>
        <h1 className="text-xl font-semibold ">Book Flight</h1>
        </div>
        <div className='fixed right-4'>
        <button className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        </div>
      </div>
      
      <div className="rounded-lg shadow-sm mb-4">
        <div className="bg-white rounded-full mx-4  justify-be flex space-x-2 mb-4">
          <button className="w-full py-2 bg-red-500 text-white rounded-full text-sm font-medium">One way</button>
          <button className="w-full py-2  text-gray-700 rounded-full text-sm font-medium">Round</button>
          <button className="w-full py-2  text-gray-700 rounded-full text-sm font-medium">Multicity</button>
        </div>
        
        <div className="space-y-4 p-4 bg-white rounded-xl shadow-xl">
          <div>
            <div className="flex items-center mb-1">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-600">From</span>
            </div>
            <input type="text" name='departeur' onChange={handleFrom} className="w-full text-lg font-medium focus:outline-none border  rounded-full p-2 uppercase"  />
              <div className={`shadow bg-white w-full  rounded-xl relative -top- p-3 ${keyword != 'clientError' ? 'block' : 'hidden'}`}>
              <ul className='grid gap-3'>
              {!from.code  ? from.map((item)=> {
                return  <li key={item.id} className={`hover:bg-black/20 rounded-xl p-2 cursor-pointer }`}>{item.name} ({item.iataCode})</li>
              }) : '' } 
                </ul>
            </div>
            <p className="text-xs text-gray-500">Indira Gandhi International Airport</p>
          </div>
          
          
          
          <div className="flex justify-end">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-600">To</span>
            </div>
            <input type="text" name='to' onChange={handleTo}  className="w-full text-lg font-medium focus:outline-none uppercase rounded-full border p-2"  />
            <div className={`shadow bg-white w-full  rounded-xl relative -top- p-3 ${keyword != 'clientError' ? 'block' : 'hidden'}`}>
              <ul className='grid gap-3'>
              {!to.code  ? to.map((item)=> {
                return  <li key={item.id} className={`hover:bg-black/20 rounded-xl p-2 cursor-pointer }`}>{item.name} ({item.iataCode})</li>
              }) : '' } 
                </ul>
            </div>
            <p className="text-xs text-gray-500">Netaji Subhash Chandra Bose International Airport</p>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600">Departure</span>
              </div>
              <input type="text" value="15/07/2022" className="w-full text-lg font-medium focus:outline-none" readOnly />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600">Return</span>
              </div>
              <input type="text" value="Add Return Date" className="w-full text-lg text-gray-400 focus:outline-none" readOnly />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm text-gray-600">Traveller</span>
              </div>
              <input type="text" value="1 Adult" className="w-full text-lg font-medium focus:outline-none" readOnly />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-sm text-gray-600">Class</span>
              </div>
              <input type="text" value="Economy" className="w-full text-lg font-medium focus:outline-none" readOnly />
            </div>
          </div>
        </div>
      </div>
      
      <button className="w-full py-3 px-4 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-4">
        Search
      </button>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Hot offer</h2>
          <a href="#" className="text-red-500 text-sm">See all</a>
        </div>
        <div className="flex space-x-4">
          <div className="bg-yellow-100 p-4 rounded-lg flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-yellow-800 font-bold text-xl">15% OFF</p>
                <p className="text-sm text-yellow-700">with mastercard</p>
              </div>
              <img src="/mastercard-logo.svg" alt="Mastercard" className="h-8" />
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-800 font-bold text-xl">23% OFF</p>
                <p className="text-sm text-blue-700">Visa card offer</p>
              </div>
              <img src="/visa-logo.svg" alt="Visa" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  
</>
  )
}

export default Home