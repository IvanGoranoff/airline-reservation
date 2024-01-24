// src/api/api.js
import axios from 'axios';

const baseURL = 'https://interview.fio.de/core-frontend/api';
const token = 'sZROsd2ZNfl4CBnBRTcULRFnoxTSkF';

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAirports = () => {
  return api.get('/airports');
};

export const getBookings = (pageIndex, pageSize) => {
  return api.get(`/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}`);
};

export const getBookingDetails = (bookingId) => {
  return api.get(`/bookings/${bookingId}`);
};

export const createBooking = (bookingData) => {
  return api.post('/bookings/create', bookingData);
};

export const deleteBooking = (bookingId) => {
  return api.delete(`/bookings/delete/${bookingId}`);
};

