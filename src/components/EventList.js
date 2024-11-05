// import Event from "./Event";

// const EventList =({events})=>{
//     return (
//         <ul id="event-list">
//             {events ? events.map(event => <Event key={event.id} event={event}/>) : null}
//         </ul>
//     );
// }

// export default EventList;

import React from 'react';

const EventList = ({ events }) => {
    return (
        <div>
            <button className="filter-btn">Filter</button>
            <ul id="event-list">
                {events.map((event, index) => (
                    <li key={index} className="event">
                        <h2>{event.title}</h2>
                        <p>{event.location}</p>
                        <p>{event.date}</p>
                        <button className="details-btn">Show details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;