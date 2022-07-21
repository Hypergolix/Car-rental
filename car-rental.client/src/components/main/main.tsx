import React, { useEffect, useState } from 'react'
import './main.styles.scss'
import DateTimePicker from 'react-datetime-picker'
import { useNavigate } from 'react-router-dom';

export default function Main() {
  let navigate = useNavigate();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [city, setCity] = useState('Stockholm');

  const submitSearch = () => {
    if (city !== '') {
      navigate(`/search?city=${city}`, {state:{from:fromDate, to:toDate}})
    }
  }

  // useEffect(() => {
  //   console.log(fromDate)
  // }, [fromDate])
  
  return (
    <div className='hero'>
      <div className='hero-inside'>
        <h1>Find the perfect car for you</h1>
        <div className='booking-form'>
          <div className='booking-inputs'>
            <div className='from-location booking-section'>
              <form action="#">
                <label htmlFor='city'>City</label>
                <select name="cities" id="city" onChange={(x) => setCity(x.target.value)}>
                  <option value="Stockholm">Stockholm</option>
                  <option value="Malmo">Malmo</option>
                  <option value="Gothenburg">Gothenburg</option>
                </select>
              </form>
            </div>
            <div className='from-date booking-section'>
              <h2>Pick-up date</h2>
              <DateTimePicker onChange={setFromDate} value={fromDate} />
            </div>
            <div className='to-date booking-section'>
              <h2>Drop-off date</h2>
              <DateTimePicker onChange={setToDate} value={toDate} />
            </div>
          </div>
          <div className='button' onClick={submitSearch}>
            <p>Search</p>
          </div>
        </div>
      </div>
    </div>
  )
}
