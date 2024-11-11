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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
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
            </PieChart>
        </ResponsiveContainer>
    )

}
export default EventGenresChart;