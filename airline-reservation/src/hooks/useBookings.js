// hooks/useBookings.js
import { useState } from 'react';
import { getBookings as apiGetBookings, deleteBooking as apiDeleteBooking } from '../api/api';

export function useBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await apiGetBookings(0, 10);
            setBookings(response.list);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const deleteBooking = async (bookingId) => {
        try {
            setLoading(true);
            await apiDeleteBooking(bookingId);
            fetchBookings();
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { bookings, fetchBookings, deleteBooking, loading, error };
}
