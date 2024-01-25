// BookingList.js
import React, { useState, useEffect, useCallback } from 'react';
import { getBookings, deleteBooking, getAirports } from '../api/api';
import Modal from './Modal'; // Make sure you have this component created.
import '../styles/BookingList.css';

function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [airports, setAirports] = useState({});
    const [modalMessage, setModalMessage] = useState('');

    const getAirportName = (airportId) => {
        return airports[airportId] || 'Unknown';
    };

    const fetchBookings = useCallback((pageIndex = 0, pageSize = 10) => {
        if (!hasMore) return;

        getBookings(pageIndex, pageSize)
            .then(response => {
                if (response && response.list && Array.isArray(response.list)) {
                    setBookings(prev => [...prev, ...response.list]);
                    setHasMore(response.list.length === pageSize);
                } else {
                    console.error('Invalid data format:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    }, [hasMore]);

    useEffect(() => {
        fetchBookings(pageIndex);
    }, [fetchBookings, pageIndex]);

    useEffect(() => {
        getAirports()
            .then(airportsData => {
                const airportsMap = airportsData.reduce((map, airport) => {
                    map[airport.id] = airport.title;
                    return map;
                }, {});
                setAirports(airportsMap);
            });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            setPageIndex(prevPageIndex => prevPageIndex + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDeleteClick = (bookingId) => {
        const bookingToDelete = bookings.find(booking => booking.id === bookingId);
        if (bookingToDelete) {
            const fromAirport = getAirportName(bookingToDelete.departureAirportId);
            const toAirport = getAirportName(bookingToDelete.arrivalAirportId);
            const message = `Are you sure you want to delete the booking from ${fromAirport} to ${toAirport}?`;
            setModalMessage(message);
        }
        setSelectedBookingId(bookingId);
        setModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteBooking(selectedBookingId)
            .then(() => {
                setBookings(currentBookings => currentBookings.filter(booking => booking.id !== selectedBookingId));
                setModalOpen(false);
                setSelectedBookingId(null);
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
            });
    };

    return (
        <div className="bookings-container">
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleDeleteConfirm}>
                <p>{modalMessage}</p>
            </Modal>
            <h2 className="booking-list-title">Bookings</h2>
            <ul className="booking-list">
                {bookings.map((booking, index) => (
                    <li key={booking.id + '-' + index}>
                        <div className="booking-info">
                            <p>
                                {booking.firstName} {booking.lastName} -
                                From <span className="airport-name">{getAirportName(booking.departureAirportId)}</span> to {getAirportName(booking.arrivalAirportId)}
                            </p>
                            <p>
                                Departure: {new Date(booking.departureDate).toLocaleDateString()} -
                                Return: {new Date(booking.returnDate).toLocaleDateString()}
                            </p>
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteClick(booking.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {hasMore && <p>Loading more...</p>}
        </div>
    );
}

export default BookingList;
