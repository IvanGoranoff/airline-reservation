import React, { useState, useEffect } from 'react';
import './components/styles/App.css';
import Form from './components/Form';
// import BookingList from './components/BookingList';
// Предполагаме, че имате функция getAirports във вашия api.js файл

function App() {


  return (
    <div className="App">
      <Form />
      {/* <BookingList /> */}
    </div>
  );
}

export default App;
