import React from 'react'
import HomeIcon from '../../assets/icons/home.svg'
import BookingIcon from '../../assets/icons/Bookings.svg'
import OfferIcon from '../../assets/icons/Offer2.svg'
import InboxIcon from '../../assets/icons/Inbox.svg'
import UserIcon from '../../assets/icons/User.svg'
function NavBar() {
  return (
    <div className='fixed flex w-full bottom-0 left-0 p-4 bg-[#EC441E] text-white/70 z-50'>
      <div className='w-full'>
        <ul className='flex justify-between'>
            <li className=''>
            <div className='flex justify-center'>
                <img className='' src={HomeIcon} alt="" />
            </div>
              <a href='#'>Home</a>
            </li>
            <li className=''>
            <div className=' flex justify-center'>
                <img src={BookingIcon} alt="" />
              </div>
              <a href='#'>Booking</a>
            </li>
            <li>
            <div className=' flex justify-center'>
                <img src={OfferIcon} alt="" />
              </div>
              <a href='#'>Offer</a>
            </li>
            <li>
            <div className=' flex justify-center'>
                <img src={InboxIcon} alt="" />
              </div>
              <a href='#'>Inbox</a>
            </li>
            <li>
            <div className=' flex justify-center'>
                <img src={UserIcon} alt="" />
              </div>
              <a href='#'>Profile</a>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
