import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="eventList">
      <li className="event">
        <h2>{event && event.summary}</h2>
        <p><scr className="bold">Location: </scr> {event && event.location}</p>
        <p><scr className="bold">Event Time: </scr>{event && (new Date(event.created)).toUTCString()}</p>
        {showDetails ?
          <p className="eventDetails">{event && event.description}</p> :
          null
        }
        <div className="detailbutton"><button className="details-btn"
          onClick={() => { 
            showDetails ? setShowDetails(false) : setShowDetails(true)
          }}>{showDetails ? "Hide details" : "Show details"}</button></div>
      </li></div>
  )
}

export default Event;