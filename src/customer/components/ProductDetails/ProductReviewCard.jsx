import { Grid } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Avatar from '@mui/material/Avatar'

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: '#9155fd' }}>
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
            <p>Ram</p>
            <p className="opacity-70">April 5, 2025</p>

          </div>
          <Rating value={4.5} name='half-rating' readOnly precision={0.5} />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam dolorum rerum ?</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductReviewCard
