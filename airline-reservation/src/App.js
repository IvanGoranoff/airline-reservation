import React, { useState } from 'react';
import Form from './components/Form';
import BookingList from './components/BookingList';

function App() {
  const [bookingCreated, setBookingCreated] = useState(false);

  const handleBookingSuccess = () => {
    setBookingCreated(true);
  };

  return (
    <div className="App">
      <Form onBookingSuccess={handleBookingSuccess} />
      {bookingCreated && <BookingList />}
    </div>
  );
}

export default App;
