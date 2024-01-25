import React, { useState } from 'react';
import Form from './components/Form';
import BookingList from './components/BookingList';

function App() {
  const [bookingCreated, setBookingCreated] = useState(false);

  // Handler to be called when a booking is successfully created
  const handleBookingSuccess = () => {
    setBookingCreated(true);
  };

  return (
    <div className="App">
      <Form onBookingSuccess={handleBookingSuccess} />
      {/* Conditionally render BookingList if a booking has been created */}
      {bookingCreated && <BookingList />}
    </div>
  );
}

export default App;
