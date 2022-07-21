import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import { Car, Location } from '../../../types/carrental.types';
import { Booking } from '../bookings.types';
import ArrowIcon from '@mui/icons-material/ArrowForward'
import './carbookingcard.styles.scss'

export default function Carbookingcard(props:{booking: Booking}) {
  let navigate = useNavigate();
  const imgUrl = `url(https://localhost:7221/images/${props.booking.car.imageUrl}.jpg)`
  // const [booking, setBooking] = useState('');
  
  return (
    <li className='li-main'>
      <div className='date-banner'>
        <p>From {props.booking.dateRange.start.toDateString()}</p>
        <ArrowIcon/>
        <p>To {props.booking.dateRange.end.toDateString()}</p>
      </div>
      <div className='carcard-main'>
        <div className='image' style={{backgroundImage: imgUrl}}>
        </div>
        <div className='text-middle'>
          <div>
            <h2>{props.booking.car.name}</h2>
            <p className='automatic'>
              {props.booking.car.automatic ? 
              "Automatic"
              :
              "Manual"
              }
            </p>
          </div>
          <p className='city'>{Location[props.booking.car.location].toString()}</p>
        </div>
        <div className='text-right'>
          <p className='price'>Price per day</p>
          <h2>SEK {props.booking.car.price}.00</h2>
          {/* if not signed in, grey out and link to sign in */}
          {/* <div className='button' onClick={bookCar}>
            <p>Book</p>
          </div> */}
        </div>
      </div>
    </li>
  )
}
