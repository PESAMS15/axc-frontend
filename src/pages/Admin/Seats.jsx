// src/CreateSeat.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateSeat = () => {
  const [section, setSection] = useState(0);
  const [owner, setOwner] = useState('');
  const [venue, setVenue] = useState('');
  const [row, setRow] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://axc-tickets.onrender.com/users/seats', {
        section,
        owner,
        venue,
        row,
        price,
      });

      console.log('Seat created:', response.data);
      // You can add a success message or redirect here
    } catch (error) {
      console.error('Error creating seat:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Seat</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="section">Section</label>
          <input
            type="number"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
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
          <label htmlFor="row">Row</label>
          <input
            type="number"
            id="row"
            value={row}
            onChange={(e) => setRow(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Seat
        </button>
      </form>
    </div>
  );
};

export default CreateSeat;
