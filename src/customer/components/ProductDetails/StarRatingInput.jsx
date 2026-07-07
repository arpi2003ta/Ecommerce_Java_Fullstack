import React, { useState } from 'react'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const StarRatingInput = ({ onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleSubmit = () => {
    if (rating === 0) return
    onSubmit?.({ rating, review })
    setRating(0)
    setReview('')
  }

  return (
    <div className="space-y-3">
      <Rating value={rating} onChange={(e, newValue) => setRating(newValue || 0)} precision={1} />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Write a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#9155fd', '&:hover': { bgcolor: '#7b3fdb' } }}>
        Submit Review
      </Button>
    </div>
  )
}

export default StarRatingInput
