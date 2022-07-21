import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './signin.styles.scss'
import { useNavigate } from "react-router-dom";
import { signIn } from '../../helpers/helper';
import BackIcon from '@mui/icons-material/ArrowBack'

export default function Signin() {
  let navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [badPass, setBadPass] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      return navigate(-1);
    }
  }, [navigate]);

  return (
    <div className='signup-container'>
      <div className='signup-main'>
        <h1>Sign in to account</h1>
        <input type="text" placeholder='Username' onChange={(x) => setusername(x.target.value)}/>
        <input type="password" placeholder='Password' onChange={(x) => setPassword(x.target.value)}/>
        <div className='buttons'>
          <div onClick={() => navigate('/')}>
            <BackIcon/>
          </div>
          <div className='button' onClick={() => signIn(username, password, navigate)}>
            <p>Sign in</p>
          </div>
        </div>
      </div>
    </div>
  )
}
