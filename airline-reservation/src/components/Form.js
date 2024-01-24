import React, { useState, useEffect } from 'react';
import '../styles/Form.css'; 
import { createBooking, getAirports } from '../api/api';
import '../styles/Form.css';

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    departureAirportId: '',
    arrivalAirportId: '',
    departureDate: '',
    returnDate: '',
  });
  const [airports, setAirports] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAirports()
      .then(response => setAirports(response))
      .catch(error => console.error('Error fetching airports:', error));

  }, []);
console.log(airports)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger

    // if (!validateForm()) return;

    createBooking(formData)
      .then(response => {
        console.log(response);
        setFormData({
          firstName: '',
          lastName: '',
          departureAirportId: '',
          arrivalAirportId: '',
          departureDate: '',
          returnDate: '',
        });
      })
      .catch(error => {
        console.error('Error creating booking:', error);
      });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
        <input 
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
        required
        />
        <input 
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="Last Name"
        required
        />
        <select 
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
        name="arrivalAirportId"
        value={formData.arrivalAirportId}
        onChange={handleInputChange}
        required
        >
        <option value="">Select Arrival Airport</option>
        {airports.map(airport => (
            <option key={airport.id} value={airport.id}>{airport.title}</option> 
        ))}
        </select>

        <input 
        type="date"
        name="departureDate"
        value={formData.departureDate}
        onChange={handleInputChange}
        required
        />
        <input 
        type="date"
        name="returnDate"
        value={formData.returnDate}
        onChange={handleInputChange}
        required
        />
    <button type="submit">Submit</button>
    {Object.keys(errors).map(key => (
          <p key={key} className="error">{errors[key]}</p>
        ))}
  </form>
  );
}

export default Form;
