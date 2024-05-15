import React, { useState } from 'react';

function AddFormData() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [name, setName] = useState('');

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here, e.g., send data to API
    console.log('Form submitted:', { fromDate, toDate, name });
    // Reset form fields after submission
    setFromDate('');
    setToDate('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fromDate">From:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
          required
        />
      </div>
      <div>
        <label htmlFor="toDate">To:</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={handleToDateChange}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default AddFormData;
