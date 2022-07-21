import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';
import Carsearch from './pages/carsearch/carsearch';
import Bookings from './pages/bookings/bookings';
import Viewcar from './pages/viewcar/viewcar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/search' element={<Carsearch/>}></Route>
      <Route path='/viewcar' element={<Viewcar/>}></Route>
      <Route path='/bookings' element={<Bookings/>}></Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
