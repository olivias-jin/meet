import Event from "./Event";
import React from 'react';


const EventList =({events})=>{
    return (
        <ul id="event-list">
            {events ? events.map(event => <Event key={event.id} event={event}/>) : null}
        </ul>
    );
};

export default EventList;