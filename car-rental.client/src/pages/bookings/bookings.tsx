import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/navbar';
import './bookings.styles.scss'
import { Booking } from './bookings.types';
import Carbookingcard from './subcomponents/carbookingcard';

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>();

  useEffect(() => {
    const getBookings = async () => {
      const response = await fetch(`https://localhost:7221/api/user/bookings?userName=${localStorage.getItem("username")}`);
      const json = await response.json() as Booking[];
      console.log(await json);
      const formattedBooking: Booking[] = json.map(x => ({
          id: x.id,
          guid: x.guid,
          car: x.car,
          location: x.location,
          // dateRange: x.dateRange
          dateRange: {
            start: new Date(x.dateRange.start),
            end: new Date(x.dateRange.end),
          }
        }))
      setBookings(formattedBooking);
    }
    getBookings();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className='wrapper'>
        {bookings ?
          bookings.map((x, k) => <Carbookingcard key={k} booking={x}></Carbookingcard>)
          :
          <></>
        }
      </div>
    </div>
  )
}
