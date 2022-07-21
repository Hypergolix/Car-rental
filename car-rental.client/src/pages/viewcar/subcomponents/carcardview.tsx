import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import { Car, Location } from '../../../types/carrental.types';
import './carcardview.styles.scss'

export default function Carcardview(props:{Car: Car, to:Date, from:Date}) {
  let navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    setImgUrl(`https://localhost:7221/images/${props.Car.imageUrl}.jpg`)
  }, [props])

  const bookCar = async () => {
    const response = await fetch(`https://localhost:7221/api/booking?carId=${props.Car.guid}&userName=${localStorage.getItem("username")}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({start: props.from, end:props.to })
    });
    const json = await response.json();
    console.log(await json);
  }
  
  return (
    <>
      <Navbar></Navbar>
      <div className='divider'></div>
      <div className='row-main'>
        <div className='carview-main'>
          <div>
            <div>
              <h1>Your current booking</h1>
            </div>
            <li className='carcard-main'>
              <div className='image' style={{backgroundImage: `url(${imgUrl})`}}>
              </div>
              <div className='text-middle'>
                <div>
                  <h2>{props.Car.name}</h2>
                  <p className='automatic'>
                    {props.Car.automatic ? 
                    "Automatic"
                    :
                    "Manual"
                    }
                  </p>
                </div>
                <p className='city'>{Location[props.Car.location].toString()}</p>
              </div>
              <div className='text-right'>
                <p className='price'>Price per day</p>
                <h2>SEK {props.Car.price}.00</h2>
                {/* if not signed in, grey out and link to sign in */}
                <div className='button' onClick={bookCar}>
                  <p>Book</p>
                </div>
              </div>
            </li>
          </div>
        </div>
        <div className='right-bar'>
        </div>
      </div>
    </>
  )
}
