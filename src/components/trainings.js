import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';
import dayjs from 'dayjs';

const TrainingList = () => {
const [trainings, setTrainings] = useState([]);

useEffect(() => fetchData(), []);

const fetchData = () => {
fetch('https://traineeapp.azurewebsites.net/gettrainings')
.then(response => response.json())
.then(data => setTrainings(data))
.catch(err => console.error(err))
}

const dateFormatter = (params) => {
    return dayjs(params.value).format('DD.MM.YYYY HH:mm');
  };

  const columnDefs = [
    { field: "activity" },
    { field: "date", cellRenderer: dateFormatter },
    { field: "duration" },
    { field: "customer.firstname", headerName: "First Name" },
    { field: "customer.lastname", headerName: "Last Name" }
  ];

const defaultColDef = {
sortable: true,
filter: true,
floatingFilter: true
};

return (
<div className="ag-theme-material"
style={{height: '700px', width: '95%', margin: 'auto' }}>
<AgGridReact
     rowData={trainings}
     columnDefs={columnDefs}
     defaultColDef={defaultColDef} />
</div>
);
};

export default TrainingList;