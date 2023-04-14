import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
    };

    const localizer = momentLocalizer(moment);

    const events = trainings.map(training => ({
        title: training.activity,
        start: new Date(training.date),
        end: moment(training.date)
            .add(training.duration, 'minutes')
            .toDate(),
    }));

    return (
        <div style={{ height: 700 }}>
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
        </div>
    );
};

export default MyCalendar;
