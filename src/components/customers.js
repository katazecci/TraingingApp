import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'; 

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  };

  const saveCustomer = customer => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    };
    fetch('https://traineeapp.azurewebsites.net/api/customers', options)
      .then(resp => fetchData())
      .catch(err => console.error(err));
  };


  const updateCustomer = (url, customer) => {
    const options = {
      method: 'put', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    };
    fetch(url, options)
      .then(resp => fetchData())
      .catch(err => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (!window.confirm('Are you sure you want to delete?')) return;
    const options = {
      method: 'delete'
    };
    fetch(url, options)
      .then(resp => fetchData())
      .catch(err => console.error(err));
  };

  const columnDefs = [
    { field: "firstname", headerName: "First Name" },
    { field: "lastname", headerName: "Last Name" },
    { field: "streetaddress", headerName: "Street Address" },
    { field: "postcode", headerName: "Postcode" },
    { field: "city", headerName: "City" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
    {
      field: "links.0.href",
      headerName: "",
      sortable: false,
      filter: false,
      floatingFilter: false,
      cellRenderer: params => {
        return (
          <Button onClick={() => deleteCustomer(params.value)}>Delete</Button>
        )
      }
    },
    {
      field: "links.0.href",
      headerName: "",
      sortable: false,
      filter: false,
      floatingFilter: false,
      cellRenderer: params => {
        return (
          <EditCustomer customer={params.data} updateCustomer={updateCustomer} />
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
      style={{height: '700px', width: '95%', margin: 'auto' }}>
        <AddCustomer saveCustomer={saveCustomer}/>
        <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={35}
        />
    </div>
  );
};

export default CustomerList;