import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    activity: '',
    date: '',
    duration: '',
    customer: '',
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.saveTraining(training);
    setOpen(false);
  };

  const handleChangedInput = event => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="activity"
            name="activity"
            value={training.activity}
            onChange={event => handleChangedInput(event)}
            label="Activity"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="date"
            name="date"
            value={training.date}
            onChange={event => handleChangedInput(event)}
            label="Date"
            type="datetime-local"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="duration"
            name="duration"
            value={training.duration}
            onChange={event => handleChangedInput(event)}
            label="Duration"
            type="text"
            fullWidth
            variant="standard"
          />
         <TextField
          key={training.customer} // add key prop to TextField
          margin="dense"
          id="customer"
          name="customer"
          value={training.customer}
          onChange={event => handleChangedInput(event)}
          label="Customer"
          select
          fullWidth
          variant="standard"
        >
          {customers.map(customer => (
            <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
              {customer.firstname} {customer.lastname}
            </MenuItem>
          ))}
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
