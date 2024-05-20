import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import axios from 'axios';

const Bookings = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setError(true);
    } else {
      setError(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(
          'https://webcodes.ee/test/wp-json/bookings/v1/bookings'
        );
        console.log(response);
        const dates = response.data.map((booking) => ({
          startDate: new Date(booking.startdate),
          endDate: new Date(booking.enddate),
        }));
        setBookedDates(dates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };
    fetchBookedDates();
  }, []);

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

      // Adjust dates to local time to avoid timezone issues
      const adjustedStartDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      );
      const adjustedEndDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      );

      const startdate = adjustedStartDate.toISOString().split('T')[0];
      const enddate = adjustedEndDate.toISOString().split('T')[0];

      const formData = {
        startdate: startdate,
        enddate: enddate,
        email: document.getElementById('email').value,
      };

      await axios.post(
        'https://webcodes.ee/test/wp-json/bookings/v1/add-booking',
        formData
      );
      setStartDate(null);
      setEndDate(null);
      document.getElementById('email').value = '';

      // Fetch updated booked dates after a new booking
      const response = await axios.get(
        'https://webcodes.ee/test/wp-json/bookings/v1/bookings'
      );
      const dates = response.data.map((booking) => ({
        startDate: new Date(booking.startdate),
        endDate: new Date(booking.enddate),
      }));
      setBookedDates(dates);

      console.log('Booking added successfully');
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  const tileClassName = ({ date }) => {
    return bookedDates.some(
      ({ startDate, endDate }) =>
        date >= startDate.setHours(0, 0, 0, 0) &&
        date <= endDate.setHours(23, 59, 59, 999)
    )
      ? 'booked'
      : '';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>BOOKINGS</h1>
      <ReactCalendar
        minDate={new Date()}
        className="REACT-CALENDAR"
        view="month"
        onClickDay={handleDateClick}
        value={[startDate, endDate]} // Highlight selected date range
        tileClassName={tileClassName}
      />
      {startDate && endDate && error && (
        <div style={styles.errorContainer}>
          <h3 style={styles.errorText}>
            Start date cannot be greater than end date
          </h3>
        </div>
      )}
      {!error && (
        <div style={styles.dateInfoContainer}>
          <p style={styles.dateText}>
            Selected Start Date: {startDate && startDate.toDateString()}
          </p>
          <p style={styles.dateText}>
            Selected End Date: {endDate && endDate.toDateString()}
          </p>
          <input id="email" placeholder="Email" style={styles.input}></input>
        </div>
      )}
      <button onClick={handleSubmit} style={styles.button}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  errorContainer: {
    margin: '20px 0',
    backgroundColor: '#ffdddd',
    border: '1px solid #ff8888',
    borderRadius: '5px',
    padding: '10px',
  },
  errorText: {
    color: '#ff5555',
    fontWeight: 'bold',
  },
  dateInfoContainer: {
    margin: '20px 0',
  },
  dateText: {
    fontSize: '1.1em',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '10px',
    width: 'calc(100% - 22px)',
  },
  button: {
    backgroundColor: '#ff8800',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#ff5500',
  },
};
export default Bookings;
