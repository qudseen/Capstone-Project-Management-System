import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './navbarStyles.css'
import camsLogo from '../../assets/camsLogo.png';

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)


  return (
    <div className='navbar'>
        <div className='container'>

            {/* logo goes here */}
            <div className='logo'>
               <div class="camsLogo"> <img src={camsLogo} alt="CAMS Logo" />  </div>
            </div>
            
            {/* Empty Space goes here */}
            <div className='empty'>Just for space</div>

            {/* Buttons goes here */}
            
            <div className={nav ? 'links active' : 'links'}>


                    <p className='home'>Home</p>
                    <p className='about'>About</p>
                    <p className='contact'>Contact</p>

                    {/* Sign in Button goes here */}
                    <div className='sign-in'>
                        <button className='sign-in-btn'>Sign in</button>
                    </div>

                    {/* Help icon goes here */}
                    <div className='help'>
                        <div className='question'> 
                            <svg className='qSvg' xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                <path id="ic_help_outline_24px" d="M15.05,25.2h2.9V22.3h-2.9ZM16.5,2A14.5,14.5,0,1,0,31,16.5,14.505,14.505,0,0,0,16.5,2Zm0,26.1A11.6,11.6,0,1,1,28.1,16.5,11.615,11.615,0,0,1,16.5,28.1Zm0-20.3a5.8,5.8,0,0,0-5.8,5.8h2.9a2.9,2.9,0,1,1,5.8,0c0,2.9-4.35,2.538-4.35,7.25h2.9c0-3.263,4.35-3.625,4.35-7.25A5.8,5.8,0,0,0,16.5,7.8Z" transform="translate(-2 -2)" fill="#fff"/>
                            </svg>
                         </div>
                    </div>
                
            </div>


            <div className="hamburger" onClick={handleNav}>
                    {!nav ? (<FaBars className='bars-icon' />) : (<FaTimes className='cross-icon' />)}
            </div>

        </div>
    </div>
  )
}

export default Navbar