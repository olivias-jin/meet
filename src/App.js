import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';

import './App.css';

const App = () => {

  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
  }


  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList events={events} />

    </div>);

}


export default App;
