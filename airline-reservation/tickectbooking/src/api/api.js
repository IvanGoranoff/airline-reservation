// Base URL and token for the API
const baseURL = 'https://interview.fio.de/core-frontend/api';
const token = 'sZROsd2ZNfl4CBnBRTcULRFnoxTSkF';

const headers = {
  'Content-Type': 'application/json'
};

// fetch a list of all airports
export const getAirports = () => {
  return fetch(`${baseURL}/airports`, { headers })
    .then(response => response.json());
};

// fetch a paginated list of bookings
export const getBookings = (pageIndex, pageSize) => {
  const url = `${baseURL}/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}&authToken=${token}`;
  return fetch(url, { headers })
    .then(response => response.json());
};

// fetch details of a single booking by its ID
export const getBookingDetails = (bookingId) => {
  const url = `${baseURL}/bookings/${bookingId}?authToken=${token}`;
  return fetch(url, { headers })
    .then(response => response.json());
};

// create a new booking
export const createBooking = (bookingData) => {
  const url = `${baseURL}/bookings/create?authToken=${token}`;
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(bookingData)
  }).then(response => response.json());
};
// delete a booking by its ID
export const deleteBooking = (bookingId) => {
  const url = `${baseURL}/bookings/delete/${bookingId}?authToken=${token}`;
  return fetch(url, {
    method: 'DELETE',
    headers
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text().then(text => text.length ? JSON.parse(text) : {});
  });
};
