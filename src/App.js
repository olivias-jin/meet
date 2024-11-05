import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [InfoAlert, setInfoAlert] = useState("");
 
  useEffect(() => {
    fetchData();
  }, [currentCity]);


  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }


  return (
    <div className="App">
      {/* Alert */}
      <div className='alerts-container'>
        {InfoAlert.length ? <InfoAlert text={InfoAlert}/> : null}
      </div>
      <CitySearch 
      allLocations={allLocations} 
      setCurrentCity={setCurrentCity} 
      // when to render the alert? 
      setInfoAlert={setInfoAlert}/>
      <NumberOfEvents setCurrentNOE={setCurrentNOE}/>
      <EventList events={events} />
    </div>
  );

}


export default App;
