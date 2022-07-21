import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Car,Location } from '../../../types/carrental.types';
import './carcard.styles.scss'

export default function Carcard(props:{Car: Car, from:Date, to:Date}) {
  let navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    setImgUrl(`https://localhost:7221/images/${props.Car.imageUrl}.jpg`)
  }, [props])
  
  return (
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
        <div className='button' onClick={() => navigate(`/viewcar?id=${props.Car.guid}`, {
          state:{from:props.from, to:props.to}})}>
          <p>View</p>
        </div>
      </div>
    </li>
  )
}
