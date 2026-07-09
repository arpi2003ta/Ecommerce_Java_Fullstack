import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/store'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('ROLE_CUSTOMER')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    const dummyUser = {
      id: role === 'ROLE_ADMIN' ? 0 : 1,
      firstName: role === 'ROLE_ADMIN' ? 'Admin' : 'Ram',
      lastName: role === 'ROLE_ADMIN' ? 'User' : 'Kapoor',
      email,
      role,
    }
    const dummyToken = 'dummy-jwt-token'
    localStorage.setItem('jwt', dummyToken)
    localStorage.setItem('user', JSON.stringify(dummyUser))
    dispatch(login({ user: dummyUser, token: dummyToken }))
    navigate('/')
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>Sign In</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
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
          sx={{ mb: 2 }}
          required
        />
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="login-role-label">Role</InputLabel>
          <Select
            labelId="login-role-label"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#9155fd', '&:hover': { bgcolor: '#7b3fdb' } }}>
          Sign In
        </Button>
      </form>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Don't have an account? <Link to="/register" style={{ color: '#9155fd' }}>Register</Link>
      </Typography>
    </Box>
  )
}

export default Login
