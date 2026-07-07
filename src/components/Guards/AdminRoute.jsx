import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = ({ children }) => {
  const jwt = localStorage.getItem('jwt')
  const { auth } = useSelector((store) => store)
  const isAdmin = auth.user?.role === 'ROLE_ADMIN'

  if (!jwt || !auth.user || !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
