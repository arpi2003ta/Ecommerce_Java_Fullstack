import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields')
      return
    }
    const dummyUser = { id: Date.now(), firstName, lastName, email, role: 'ROLE_CUSTOMER' }
    const dummyToken = 'dummy-jwt-token'
    localStorage.setItem('jwt', dummyToken)
    localStorage.setItem('user', JSON.stringify(dummyUser))
    navigate('/')
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>Create Account</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          required
        />
        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#9155fd', '&:hover': { bgcolor: '#7b3fdb' } }}>
          Register
        </Button>
      </form>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account? <Link to="/login" style={{ color: '#9155fd' }}>Sign In</Link>
      </Typography>
    </Box>
  )
}

export default Register
