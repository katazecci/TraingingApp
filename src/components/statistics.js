import React, { useEffect, useState } from 'react';
import { groupBy, sumBy } from 'lodash';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Statistics = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(trainings => {
        const groupedData = groupBy(trainings, 'activity');
        const data = Object.keys(groupedData).map((activity) => ({
          activity,
          totalDuration: sumBy(groupedData[activity], 'duration'),
        }));
        setData(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Trainings by total allocated minutes</h2>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalDuration" name='Total minutes:' fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Statistics;
