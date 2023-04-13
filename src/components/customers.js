import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData, []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  }

  const columnDefs = [
    { field: "firstname" },
    { field: "lastname" },
    { field: "streetaddress" },
    { field: "postcode" },
    { field: "city" },
    { field: "email" },
    { field: "phone" }
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
        rowData={customers}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef} />
    </div>
  );
};

export default CustomerList;