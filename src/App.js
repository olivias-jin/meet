import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';

// import Header from './components/Header';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlertMessage, setInfoAlert] = useState("");
  const [errorAlertMessage, setErrorAlert] = useState("");
  const [warningAlertMessage, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine){
      setWarningAlert("");
    }else {
      setWarningAlert("You are currently offline; data may be outdated.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

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
      <h1>Meet App</h1>
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

      <div className='charts-container'>
        <CityEventsChart allLocations={allLocations} events={events} />
        <EventGenresChart events={events} />
      </div>

      {/* Make sure to close the error alert div */}
      {errorAlertMessage && <div className='error-alert'>{errorAlertMessage}</div>}

      <EventList events={events} />
    </div>
  );
}

export default App;
