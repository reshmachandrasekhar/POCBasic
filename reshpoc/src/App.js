import React, { useState } from 'react';
import { Button, Popover, TextField, Grid, Typography, IconButton  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PopoverForm = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    message: '', 
  });

  const [open, setOpen] = useState(false);
  const [openSuccessPopover, setOpenSuccessPopover] = useState(false); // State for success 
  const [errors, setErrors] = useState({});  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setErrors({}); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });

    const phoneNumberRegex = /^\d{10}$/;
    if (formData.phoneNumber && !phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, set the errors state to show validation messages
      setErrors(newErrors);
      return;
    }   
    setOpenSuccessPopover(true);
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      address: '',
      city: '',
      message: '',
    });

    handleClose(); 
    
  
  };

  const handleSuccessPopoverClose = () => {
    setOpenSuccessPopover(false); // Close the success popover
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Button variant="contained" sx={{
          backgroundColor: '#800000', // Darker red
          '&:hover': {
            backgroundColor: '#000000', // Even darker on hover
          },
		  
		  }} onClick={handleClick}>
       TVSR Enquiry
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: 30, width: 500, height: 500, position: 'relative', overflowY: 'auto'}}>
        <IconButton
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'gray',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography 
            variant="h5" 
            style={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              fontFamily: 'Helvetica', 
              marginBottom: '20px'
            }}>
            TVSR Equiry Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name} 
                  helperText={errors.name} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  type="email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={2}  
                  error={!!errors.message}
                  helperText={errors.message}
                />
              </Grid>

              

              <Grid item xs={12}>
                <Button type="submit" variant="contained" sx={{
          backgroundColor: '#800000', 
          '&:hover': {
            backgroundColor: '#000000', 
          },
		  
		  }} fullWidth>
                  Send Message
                </Button>
              </Grid>
            
            </Grid>
          </form>
        </div>
      </Popover>
      <Popover
        open={openSuccessPopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handleSuccessPopoverClose}
      >
        <div style={{ padding: 30, width: 400, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Thanks for contacting us
          </Typography>
          <Button variant="contained" sx={{
          backgroundColor: '#800000', 
          '&:hover': {
            backgroundColor: '#000000', 
          },
		  
		  }} onClick={handleSuccessPopoverClose}>
            Close
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default PopoverForm;
