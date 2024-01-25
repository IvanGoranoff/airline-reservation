import React, { useState, useEffect } from 'react';
import '../styles/Form.css';
import { createBooking, getAirports } from '../api/api';

function Form(props) {
    // Initial state setup for form fields and errors
    const initialFormState = {
        firstName: '',
        lastName: '',
        departureAirportId: '',
        arrivalAirportId: '',
        departureDate: '',
        returnDate: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [airports, setAirports] = useState([]);
    const [errors, setErrors] = useState({});

    // Resets the form to initial state
    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({});
    };

    // Fetches the list of airports 
    useEffect(() => {
        getAirports()
            .then(response => setAirports(response))
            .catch(error => console.error('Error fetching airports:', error));

    }, []);

    // Updates form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const today = new Date().toISOString().split('T')[0];

    const inputClassName = (name) => {
        return `form-input${errors[name] ? ' has-error' : ''}`;
    };

    // Validates the form data
    const validateForm = () => {
        let validationErrors = {};

        const todayDate = new Date(today);

        const departureDate = new Date(formData.departureDate);
        const returnDate = new Date(formData.returnDate);

        if (!formData.firstName.trim()) validationErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) validationErrors.lastName = 'Last name is required';

        if (!formData.departureAirportId) validationErrors.departureAirportId = 'Departure airport is required';
        if (!formData.arrivalAirportId) validationErrors.arrivalAirportId = 'Arrival airport is required';
        if (formData.departureAirportId === formData.arrivalAirportId) {
            validationErrors.arrivalAirportId = 'Arrival airport must be different from departure airport';
        }

        if (!formData.departureDate) {
            validationErrors.departureDate = 'Departure date is required';
        } else if (departureDate < todayDate) {
            validationErrors.departureDate = 'Departure date cannot be in the past';
        }

        if (!formData.returnDate) {
            validationErrors.returnDate = 'Return date is required';
        } else if (returnDate < todayDate) {
            validationErrors.returnDate = 'Return date cannot be in the past';
        } else if (returnDate < departureDate) {
            validationErrors.returnDate = 'Return date cannot be before the departure date';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };


    // Handles the form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        createBooking(formData)
            .then(response => {
                console.log(response);
                props.onBookingSuccess();
            })
            .catch(error => {
                console.error('Error creating booking:', error);
            });
    };


    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <h2>Plane Ticket Booking</h2>
            <div className="form-row">
                <input
                    className={inputClassName('firstName')}
                    key="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                />
                <input
                    className={inputClassName('lastName')}
                    key="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                />
            </div>
            <div className="form-row">
                <select
                    className={inputClassName('departureAirportId')}
                    key="departureAirportId"
                    name="departureAirportId"
                    value={formData.departureAirportId}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Departure Airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.title}</option>
                    ))}
                </select>

                <select
                    className={inputClassName('arrivalAirportId')}
                    name="arrivalAirportId"
                    key="arrivalAirportId"
                    value={formData.arrivalAirportId}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Arrival Airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.title}</option>
                    ))}
                </select>
            </div>
            <div className="form-row">
                <input
                    className={inputClassName('departureDate')}
                    type="date"
                    name="departureDate"
                    key="arrivalAirportId"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    min={today}
                    required
                />
                <input
                    className={inputClassName('returnDate')}
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    min={formData.departureDate || today}
                    required
                />
            </div>
            <div className="form-buttons">
                <button type="button" onClick={resetForm}>Clear</button>
                <button type="submit">Submit</button>
            </div>
            {Object.keys(errors).map(key => (
                <p key={key} className="error-message">{errors[key]}</p>
            ))}
        </form>
    );

}

export default Form;
