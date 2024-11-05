import { useState } from "react";

const NumberOfEvents = ({ setErrorAlert }) => {

  const [number, setNumber] = useState(30);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);

    let errorText;
    if (value === isNaN || value.length <= 0) {
      errorText = "Only positive numbers are allowed"
    } else {
      errorText = ""
    }
    setErrorAlert(errorText);
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