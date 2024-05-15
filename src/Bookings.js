import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import axios from 'axios';

const Bookings = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setError(true);
    } else {
      setError(false);
    }
  }, [startDate, endDate]);

  const handleDateClick = (date) => {
    if (!startDate) {
      // If startDate is not set, set the clicked date as startDate
      setStartDate(date);
    } else if (!endDate) {
      // If endDate is not set, set the clicked date as endDate
      setEndDate(date);
    } else {
      // If both startDate and endDate are already set, reset them
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!startDate || !endDate || startDate > endDate) {
        console.log('Error occurred adding data!');
        return;
      }

      const formData = {
        startdate: startDate.toISOString(),
        enddate: endDate.toISOString(),
        email: document.getElementById('email').value,
      };

      const response = await axios.post(
        'https://webcodes.ee/test/wp-json/bookings/v1/add-booking',
        formData
      );
      console.log(formData);
      console.log('Booking added successfully:', response.data);
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  return (
    <div>
      <h1>BOOKINGS</h1>
      <ReactCalendar
        minDate={new Date()}
        className="REACT-CALENDAR"
        view="month"
        onClickDay={handleDateClick}
        value={[startDate, endDate]} // Highlight selected date range
      />
      {startDate && endDate && error && (
        <div className="smaller-than">
          <h3>Start date cannot be greater than end date</h3>
        </div>
      )}
      {!error && (
        <div>
          <p>Selected Start Date: {startDate && startDate.toDateString()}</p>
          <p>Selected End Date: {endDate && endDate.toDateString()}</p>
          <input id="email" placeholder="Email"></input>
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Bookings;
