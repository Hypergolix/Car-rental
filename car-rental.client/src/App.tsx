import React from 'react';
import './App.scss';
import BackIcon from '@mui/icons-material/ArrowBack'
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Main></Main>
    </div>
  );
}

export default App;
