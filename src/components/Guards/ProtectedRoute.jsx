import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const jwt = localStorage.getItem('jwt')
  const { auth } = useSelector((store) => store)

  if (!jwt && !auth.user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
