import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length
      const city = location.split((/, | - /))[0]
      return { city, count };
    })
    return data;
  };

  return (
    <div className="ScatterChart">
    <div className="chartGroup">Number of Event by City</div>
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
          fill : "white",
          
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City"
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14, fontWeight: "bold", fill:"white"}} />
        <YAxis type="number" dataKey="count" name="Number of events" tick={{fill:"white"}} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="yellow"  />
      </ScatterChart>
    </ResponsiveContainer></div>
  );
}

export default CityEventsChart;