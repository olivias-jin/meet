import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(30);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);

    // alert
    let errorText;
    if (isNaN(value) || value.length <= 0) {
      errorText = 'Please enter a valid number';
    } else {
      errorText = '';
    }
    setCurrentNOE(value);
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        data-testid="numberOfEventsInput"
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
}

NumberOfEvents.propTypes  ={
  setCurrentNOE: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired
};

export default NumberOfEvents;