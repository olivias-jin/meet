import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(30);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlertMessage, setInfoAlert] = useState("");
  const [errorAlertMessage, setErrorAlert] = useState("");
  const [warningAlertMessage, setWarningAlert] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity]);

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      if (!allEvents.length) {
        setErrorAlert("No events found.");
      } else {
        const filteredEvents = currentCity === "See all cities" ?
          allEvents :
          allEvents.filter(event => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
        if (currentCity !== "See all cities" && filteredEvents.length === 0) {
          setWarningAlert("No events in this city.");
        }
      }
    } catch (error) {
      setErrorAlert("Error fetching events.");
    }
  }

  return (
    <div className="App">
      {/* Info Alert */}
      <div className='alerts-container'>
        {infoAlertMessage.length ? <InfoAlert text={infoAlertMessage} /> : null}
      </div>

      {/* ErrorAlert */}
      <div className='alerts-container'>
        {errorAlertMessage.length ? <ErrorAlert text={errorAlertMessage} /> : null}
      </div>

      {/* Warning Alert */}
      <div className='alert-container'>
        {warningAlertMessage.length ? <WarningAlert text={warningAlertMessage} /> : null}
      </div>

      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
        setErrorAlert={setErrorAlert}
        setWarningAlert={setWarningAlert}
      />

      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      
      {/* Make sure to close the error alert div */}
      {errorAlertMessage && <div className='error-alert'>{errorAlertMessage}</div>}
      
      <EventList events={events} />
    </div>
  );
}

export default App;
