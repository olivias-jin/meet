import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

  const [number, setNumber] = useState(30);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);

    let errorText;
    const parsedValue = Number(value);
    
    // check for valid postivie number
    if (isNaN(parsedValue) || parsedValue <= 0) {
      errorText = "Only positive numbers are allowed"
    } else {
      errorText = ""
    }
    setErrorAlert(errorText);
    setCurrentNOE(parsedValue);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        data-testId="numberOfEventsInput"
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
}

export default NumberOfEvents;