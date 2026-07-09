import { Outlet } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton,
  ListItemText, CssBaseline, Box, IconButton
} from '@mui/material'
import { Dashboard as DashboardIcon, Inventory as ProductsIcon, ShoppingCart as OrdersIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/store'

const drawerWidth = 240

const AdminLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth } = useSelector((store) => store)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Products', icon: <ProductsIcon />, path: '/admin' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/admin' },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {auth.user?.firstName} {auth.user?.lastName}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} title="Logout">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <Box sx={{ mr: 2, display: 'flex', color: '#1976d2' }}>{item.icon}</Box>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
