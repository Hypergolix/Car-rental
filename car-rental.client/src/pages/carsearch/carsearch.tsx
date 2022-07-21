import React, { useEffect, useState } from 'react'
import './carsearch.styles.scss'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Carcard from './subcomponents/carcard';
import Navbar from '../../components/navbar/navbar';
import { Car, Location } from '../../types/carrental.types';

export default function Carsearch(props:any) {
  const location = useLocation();
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();

  const [searchParams, setSearchParams] = useSearchParams();
  const [cityParam, setCityParam] = useState(searchParams.get("city"));
  const [cars, setCars] = useState<Car[]>();

  useEffect(() => {
    const temp = location.state as { from: Date, to: Date }
    setFrom(temp.from);
    setTo(temp.to);
  }, [location.state])
  
  useEffect(() => {
    const getData = async () => {
      let loc = "";
      if (cityParam !== null) {
        loc = cityParam;
      }
      const cityEnum = Location[loc as keyof typeof Location];
      console.log(cityEnum);
      
      let newData:any;
      if (from && to) {
        newData = {start:from, end:to}
      }
      console.log(newData);

      const response = await fetch(`https://localhost:7221/api/cars/available?location=${cityEnum}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const json = await response.json();
      console.log(await json);
      setCars(json);
    }
    if (cityParam && to && from){
      getData();
    }
    console.log(cityParam);
  }, [cityParam, to, from])
  
  return (
    <>
      <Navbar></Navbar>
      {/* {from?.getDate} */}
      <div className='divider'></div>
      <div className='carsearch-main'>
        {from && to ?
          <div className='parameters'>
            <div className='parameters-title'>
              <h2>Your search</h2>
              <div className='line'></div>
            </div>
            <div className='parameters-first'>
              <p>Dates</p>
              <p>From {from.toDateString()}</p>
              <p>To {to.toDateString()}</p>
            </div>
            <div className='parameters-second'>
              <p>Price</p>
              
            </div>
          </div>
          :
          <>
          Loading...
          </>
        }
        {cars && from && to ? 
          <ul className='list'>
            {cars.map((x, k) => 
              <Carcard
              key={k}
              Car={x}
              from={from}
              to={to}
              />)}
          </ul>
          :
          <>
            <p>Loading...</p>
          </>
        }
      </div>
    </>
  )
}
