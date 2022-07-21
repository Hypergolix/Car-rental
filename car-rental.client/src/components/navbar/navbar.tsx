import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../../helpers/helper';
import './navbar.styles.scss'

export default function Navbar() {
  let navigate = useNavigate();
  const [user, setUser] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate])

  useEffect(() => {
    setUser(localStorage.getItem("username") || '');
  }, [menuOpen])

  return (
    <nav>
      <div className='logo' onClick={() => navigate('/')}>
        <h1 className='logo-title'>Rent</h1>
      </div>
      {
        user !== '' ? 
        <div className='user-container'>
          <p onClick={() => setMenuOpen(!menuOpen)} >Hello {user}</p>
          {
            menuOpen ? 
            <div className='menu'>
              <p onClick={() => {signOut(navigate) 
                window.location.reload();}}>Sign out</p>
              <p onClick={() => navigate('/bookings')}>Your bookings</p>
            </div>
            :
            <></>
          }
        </div>
        :
        <div className='buttons'>
          <Link to='/signin' className='button'>
            <p>Sign In</p>
          </Link>
          <Link to='/signup' className='button'>
            <p>Sign Up</p>
          </Link>
        </div>
      }
    </nav>
  )
}
