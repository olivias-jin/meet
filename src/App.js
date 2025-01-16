import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';

// Spinner
import Spinner from './components/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlertMessage, setInfoAlert] = useState("");
  const [errorAlertMessage, setErrorAlert] = useState("");
  const [warningAlertMessage, setWarningAlert] = useState("");
  const [loading, setLoading] = useState(false);  // 로딩 상태 추가

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline; data may be outdated.");
    }
    fetchData();
  }, [currentCity, currentNOE]);



  const fetchData = async () => {
    setLoading(true);
    console.log("Loading started", loading); // 추가된 로그로 상태 확인
    try {
      const allEvents = await getEvents();
      console.log("All events fetched", allEvents); // 추가된 로그
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
    } finally {
      console.log("Loading finished"); 
      setLoading(false);
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

      {/* CitySearch Component */}
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
        setErrorAlert={setErrorAlert}
        setWarningAlert={setWarningAlert}
      />

      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />

      {/* Charts */}
      <div className='charts-container'>
        <EventGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>

      {/* Error Alert */}
      {errorAlertMessage && <div className='error-alert'>{errorAlertMessage}</div>}

      {/* 로딩 상태일때 Spinner 표시 */}
      {loading && <Spinner />}

      {/* Event List */}
      <EventList events={events} />
    </div>
  );
}

export default App;
