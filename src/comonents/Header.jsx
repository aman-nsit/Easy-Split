import React from 'react'
import {Typography  } from 'antd'
import logo from './Logo_New.png';
function Header() {
  return (
    <div className='app-name' >
      {/* <Typography.Title style={{color:'whitesmoke'}}>
          Easy Split
      </Typography.Title>
      */}
      <img className="logo" src={logo} alt="No" />
      
    </div>  
  )
}

export default Header
