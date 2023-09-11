// src/CreateConcert.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateConcert = () => {
  const [owner, setOwner] = useState('');
  const [consertMonth, setConsertMonth] = useState('');
  const [concertDay, setConcertDay] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [tour, settour] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const response = await axios.post('https://axc-tickets.onrender.com/users/tickets', {
        owner,
        consertMonth,
        tour,
        concertDay,
        time,
        venue,
        city,
      });

      console.log('Concert created:', response.data);
      // You can add a success message or redirect here
    } catch (error) {
      console.error('Error creating concert:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Concert</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="consertMonth">Concert Month</label>
          <input
            type="text"
            id="consertMonth"
            value={consertMonth}
            onChange={(e) => setConsertMonth(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="concertDay">Concert Day</label>
          <input
            type="number"
            id="concertDay"
            value={concertDay}
            onChange={(e) => setConcertDay(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time">Time</label>
          <input
            type="number"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tour">Tour name</label>
          <input
            type="text"
            id="tour"
            value={tour}
            onChange={(e) => settour(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="venue">Venue</label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Concert
        </button>
      </form>
    </div>
  );
};

export default CreateConcert;
