import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';

const Bookings = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
      <div>
        <p>Selected Start Date: {startDate && startDate.toDateString()}</p>
        <p>Selected End Date: {endDate && endDate.toDateString()}</p>
      </div>
      {/* Add a "Submit" button to submit the selected dates */}
    </div>
  );
};

export default Bookings;
