import React from 'react'
import LeftArrowIcon from '../../assets/icons/leftArrow.svg'
import MenuIcon from '../../assets/icons/menu.svg'
function TopBar() {
  return (
    <div>
        <div className='flex justify-between p-4 '>
            <img src={LeftArrowIcon} alt="a" />
            <h1 className='font-semibold text-xl '>Book Flight</h1>
            <img src={MenuIcon} alt="a" />
        </div>
    </div>
  )
}

export default TopBar
