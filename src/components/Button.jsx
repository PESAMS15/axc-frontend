// Button.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Button = ({ id }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (showInfo) {
      // Make an API request using the provided ID to fetch the information
      axios.get(`/api/info/${id}`).then((response) => {
        setData(response.data);
      });
    }
  }, [showInfo, id]);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div>
      <button onClick={toggleInfo}>Show Information</button>
      {showInfo && data && (
        <div>
          <h2>Information:</h2>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
};

export default Button;
