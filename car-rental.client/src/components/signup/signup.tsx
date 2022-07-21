import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './signup.styles.scss'
import { useNavigate } from "react-router-dom";
import { signIn } from '../../helpers/helper';

export default function Signup() {
  let navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [badPass, setBadPass] = useState(0);

  const signUp = async () => {
    if (username !== '' && password !== '')
    {
      const data = {
        username: username,
        password: password,
      }

      const response = await fetch(`https://localhost:7221/api/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      console.log(json);
      signIn(username, password, navigate);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      return navigate(-1);
    }
  }, [navigate]);

  // useEffect(() => {

  // }, [badPass]);
  
  return (
    <div className='signup-container'>
      <div className='signup-main'>
        <h1>Create an account</h1>
        <input type="text" placeholder='Username' onChange={(x) => setusername(x.target.value)}/>
        <input type="password" placeholder='Password' onChange={(x) => setPassword(x.target.value)}/>
        <div className='buttons'>
          <div className='button' onClick={signUp}>
            <p>Sign up</p>
          </div>
          <Link to='/signin' className='already'>
            <p>Have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
