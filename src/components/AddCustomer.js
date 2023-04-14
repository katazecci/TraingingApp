import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.saveCustomer(customer);
    setOpen(false);
  };

  const handleChangedInput = event => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            value={customer.firstname}
            onChange={event => handleChangedInput(event)}
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="lastname"
            name="lastname"
            value={customer.lastname}
            onChange={event => handleChangedInput(event)}
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="streetaddress"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={event => handleChangedInput(event)}
            label="Street Address"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="postcode"
            name="postcode"
            value={customer.postcode}
            onChange={event => handleChangedInput(event)}
            label="Postcode"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="city"
            name="city"
            value={customer.city}
            onChange={event => handleChangedInput(event)}
            label="City"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            value={customer.email}
            onChange={event => handleChangedInput(event)}
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={event => handleChangedInput(event)}
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

