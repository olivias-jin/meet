import React, { PureComponent, useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Legend
} from 'recharts';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     setData(getData());
    // },[`${events}`]);
    
    // const getData = () => {
    //     const event = events
    // 
    }


export default EventGenresChart;