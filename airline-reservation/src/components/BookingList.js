import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../api/api';
import '../styles/BookingList.css';

function BookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        const pageIndex = 0;
        const pageSize = 10;

        getBookings(pageIndex, pageSize)
            .then(response => {
                if (response && response.list && Array.isArray(response.list)) {
                    console.log(response.list)
                    setBookings(response.list);
                } else {
                    console.log(response)

                    console.error('Invalid data format:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    };


    const handleDelete = (bookingId) => {
        deleteBooking(bookingId)
            .then(() => {
                fetchBookings(); // Обновяване на списъка след изтриването
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
            });
    };

    return (
        <div className="bookings-container">
            <h2 className="booking-list-title">Bookings</h2>
            <ul className="booking-list">
                {bookings.map(booking => (
                    <li key={booking.id}>
                        <p>{booking.firstName} {booking.lastName} - From Airport ID {booking.departureAirportId} to Airport ID {booking.arrivalAirportId}</p>
                        <button className="delete-button" onClick={() => handleDelete(booking.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default BookingList;
