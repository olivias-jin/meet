import { render } from '@testing-library/react';
import React, { PureComponent, useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Legend,
    Sector,
    Cell,
} from 'recharts';

// 장르(카테고리)의 목록을 담고 있는 배열. 이 배열은 각 장르를 기반으로 이벤트 테이러를 필터링하고 차트에 표시할 항목을 정의함
const genres = ["React", "JavaScript", "Node", "JQuery", "Angular"];

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);


    const getData = () => {
        const data = genres.map((genre) => {
            const filteredEvents = events.filter((event) => event.summary.includes(genre));
            return {
                name: genre,
                value: filteredEvents.length
            };
        });
        return data;
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042' ,'#ff4263'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

        return percent ? (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
                style={{fontWeight:"bold"}}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text >)
            : null;
    };

    useEffect(() => {
        setData(getData()); // Call getData when the component mounts or events change
    }, [events]);

    // Only render the Pie chart if data is not empty
    if (data.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className='pieChart'>
            <div className='pieGroup'>Number of Event by Genre</div>
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}

                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center" />
            </PieChart>
        </ResponsiveContainer></div>
    )

}
export default EventGenresChart;