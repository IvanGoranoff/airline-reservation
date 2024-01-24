const baseURL = 'https://interview.fio.de/core-frontend/api';
const token = 'sZROsd2ZNfl4CBnBRTcULRFnoxTSkF';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
};



export const getAirports = () => {
  return fetch(`${baseURL}/airports`, { headers })
    .then(response => response.json());
};

export const getBookings = (pageIndex, pageSize) => {
  return fetch(`${baseURL}/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}`, { headers })
    .then(response => response.json());
};

export const getBookingDetails = (bookingId) => {
  return fetch(`${baseURL}/bookings/${bookingId}`, { headers })
    .then(response => response.json());
};

export const createBooking = (bookingData) => {
    const url = `${baseURL}/bookings/create?authToken=${token}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    }).then(response => response.json());
  };
  

export const deleteBooking = (bookingId) => {
  return fetch(`${baseURL}/bookings/delete/${bookingId}`, {
    method: 'DELETE',
    headers
  }).then(response => response.json());
};
