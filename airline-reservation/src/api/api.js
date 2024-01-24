const baseURL = 'https://interview.fio.de/core-frontend/api';
const token = 'sZROsd2ZNfl4CBnBRTcULRFnoxTSkF';

const headers = {
  'Content-Type': 'application/json'
};

export const getAirports = () => {
  return fetch(`${baseURL}/airports`, { headers })
    .then(response => response.json());
};

export const getBookings = (pageIndex, pageSize) => {
  const url = `${baseURL}/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}&authToken=${token}`;
  return fetch(url, { headers })
    .then(response => response.json());
};

export const getBookingDetails = (bookingId) => {
  const url = `${baseURL}/bookings/${bookingId}?authToken=${token}`;
  return fetch(url, { headers })
    .then(response => response.json());
};

export const createBooking = (bookingData) => {
  const url = `${baseURL}/bookings/create?authToken=${token}`;
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(bookingData)
  }).then(response => response.json());
};

export const deleteBooking = (bookingId) => {
  const url = `${baseURL}/bookings/delete/${bookingId}?authToken=${token}`;
  return fetch(url, {
    method: 'DELETE',
    headers
  }).then(response => response.json());
};
