import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import { Car } from '../../types/carrental.types';
import Carcardview from './subcomponents/carcardview';
import './viewcar.styles.scss'

export default function Viewcar() {
  const location = useLocation();
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();

  const [searchParams, setSearchParams] = useSearchParams();
  const [idParam, setIdParam] = useState(searchParams.get("id"));
  const [car, setCar] = useState<Car>();

  useEffect(() => {
    const temp = location.state as { from: Date, to: Date }
    setFrom(temp.from);
    setTo(temp.to);
  }, [location.state])

  useEffect(() => {
    const getData = async () => {
      let id = "";
      if (idParam !== null) {
        id = idParam;
      }
      const response = await fetch(`https://localhost:7221/api/car?carId=${id}`);
      const json = await response.json();
      setCar(json);
    }
    getData();
  }, [idParam])

  return (
    <div>
      <div></div>
      {
        car && to && from ?
        <Carcardview 
        Car={car}
        to={to}
        from={from}
        ></Carcardview>
        :
        <>Loading...</>
      }
    </div>
  )
}
