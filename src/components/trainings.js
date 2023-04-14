import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import AddTraining from './AddTraining';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }

  const saveTraining = training => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    };
    fetch('https://traineeapp.azurewebsites.net/api/trainings', options)
      .then(resp => fetchData())
      .catch(err => console.error(err));
  };

  const dateFormatter = (params) => {
    return dayjs(params.value).format('DD.MM.YYYY HH:mm');
  };

  const deleteTraining = (id) => {

    if (!window.confirm('Are you sure you want to delete?')) return;
    const options = {
      method: 'delete'
    };
    fetch('https://traineeapp.azurewebsites.net/api/trainings/' + id, options)
      .then(resp => fetchData())
      .catch(err => console.error(err));
  };


  const columnDefs = [
    { field: "activity" },
    { field: "date", cellRenderer: dateFormatter },
    { field: "duration" },
    { field: "customer.firstname", headerName: "First Name" },
    { field: "customer.lastname", headerName: "Last Name" },
    {
      field: "id",
      headerName: "",
      sortable: false,
      filter: false,
      floatingFilter: false,
      cellRenderer: params => {
        return (
          <Button onClick={() => deleteTraining(params.value)}>Delete</Button>
        )
      }
    }
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true
  };


  return (
    <div className="ag-theme-material"
      style={{ height: '700px', width: '95%', margin: 'auto' }}>
      <AddTraining saveTraining={saveTraining} />
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={35}
      />
    </div>
  );
};

export default TrainingList;