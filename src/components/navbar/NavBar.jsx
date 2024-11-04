import React from 'react'
import HomeIcon from '../../assets/icons/home.svg'
import BookingIcon from '../../assets/icons/Bookings.svg'
import OfferIcon from '../../assets/icons/Offer2.svg'
import InboxIcon from '../../assets/icons/Inbox.svg'
import UserIcon from '../../assets/icons/user.svg'
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <div className='fixed flex w-full bottom-0 left-0 p-4 bg-[#EC441E] text-white/70 z-50'>
      <div className='w-full'>
        <ul className='flex justify-between '>
            <Link to={'/'} className=''>
            <div className='flex justify-center'>
                <img className='invert' src={HomeIcon} alt="" />
            </div>
              <a className='' href='#'>Home</a>
            </Link>
            <li className=''>
            <div className=' flex justify-center'>
                <img className='invert' src={BookingIcon} alt="" />
              </div>
              <a href='#'>Booking</a>
            </li>
            <li>
            <div className=' flex justify-center'>
                <img className='invert' src={OfferIcon} alt="" />
              </div>
              <a href='#'>Offer</a>
            </li>
            <li>
            <div className=' flex justify-center'>
                <img className='invert' src={InboxIcon} alt="" />
              </div>
              <a href='#'>Inbox</a>
            </li>
            <li>
            <div className=' flex justify-center'>
                <img className='invert' src={UserIcon} alt="" />
              </div>
              <a href='#'>Profile</a>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
