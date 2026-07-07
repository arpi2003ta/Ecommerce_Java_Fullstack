import React from 'react';
import { Grid, Box, Button, TextField } from '@mui/material'
import AddressCard from '../../AddressCard/AddressCard'

const DeliveryAddressForm = ({ onAddressSelect }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber")
    }

    if (onAddressSelect) {
      onAddressSelect(address)
    }
    
    e.currentTarget.reset()
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>
          <div className='p-5 py-7 border-b cursor-pointer ml-5'>
            <AddressCard />
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className='border rounded-s-md shadow-md p-5'>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="shipping street-address"
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="address-level1"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required id="zip"
                    name="zip"
                    label="Zip Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="tel"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>

                  <Button sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }} size="large" type="submit" variant="contained">
                    Deliver Here
                  </Button>
                </Grid>

              </Grid>
            </form>
          </Box>

        </Grid>
      </Grid>
    </div >
  )
}

export default DeliveryAddressForm
