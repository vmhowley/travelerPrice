import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowsDownUpIcon from '../assets/icons/ArrowsDownUp.svg'

function Home() {
    const [data, setData] = useState({})
    const [from, setFrom] = useState([])
    const [to, setTo] = useState([])
    const [open, setOpen] = useState(null)
    const [locations, setLocations] = useState()
    const [keyword, setKeyword] = useState()
  
    const handleInput = (e) => {
        setData({...data, [e.currentTarget.name]: e.target.value})
        console.log(citySearch)
    }
    const handleFromTab = (e) => {
      setOpen(!open)
      console.log('open')
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
   
      const handleSelection = (e) => {
        console.log('')
      }
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(data)
    }
  return (
<>
<div className='p-4'>
<div className=' shadow  rounded-full h-26 bg-white  flex justify-between text-gray-500 text-center mx-2 mb-6 '>
  <div className='bg-primary p-2 rounded-full w-full text-white'>One way</div>
  <div className=' p-2 rounded-full w-full'>Round</div>
  <div className=' p-2 rounded-full w-full'>Multicity</div>
</div>
  <form className='bg-white p-4 shadow rounded-xl grid gap-6 static' action="">
    <div onClick={handleFromTab} className={`grid ${open ? 'fixed inset-0 z-50' : ''}`}>
      <input  className='border rounded-xl h-14 p-2 placeholder-gray-950 font-semibold ps-8' type="text" id="from" name="from" placeholder='Leaving from'  onChange={handleFrom} />
      <section id="from_country" className={`rounded-xl border z-20 bg-white top-16 ${open ? 'fixed inset-0 z-50' :'hidden'}`} name="from_country" onChange={handleInput}>
        <ul>
        {!from.code ? from.map((location) => (
          <div key={location.id}>
          <li  key={location.id} value={location.name} className='capitalize cursor-pointer rounded-xl p-2'>
             {location.address.cityName.toLowerCase()} ({location.name.toLowerCase()} - {location.iataCode})
          </li>
          </div>
        )): ''}
        </ul>
      </section>
    </div>
    <div className='fixed right-16 top-36 z-10'>
      <img className='w-max rounded-full p-1 border bg-white' src={ArrowsDownUpIcon} alt="" />
    </div>
    <div className='grid'>
      <input className='border rounded-xl h-14 p-2 placeholder-gray-950 font-semibold ps-8' type="text" id="to" name="to" placeholder='Going to'  onChange={handleFrom} />
      <ul id="from_country" name="from_country" onChange={handleInput}>
        {!to.code ? to.map((location) => (
          <div onClick={()=> {
            console.log(location.name)
          }} key={location.id} value={location.name} className='capitalize cursor-pointer bg-white'>
             {location.address.cityName.toLowerCase()} ({location.name.toLowerCase()} - {location.iataCode})
          </div>
        )): ''}
      </ul>
    </div>
    <div>
    </div>
    <button type="submit"></button>
  </form>
</div>
</>
  )
}

export default Home