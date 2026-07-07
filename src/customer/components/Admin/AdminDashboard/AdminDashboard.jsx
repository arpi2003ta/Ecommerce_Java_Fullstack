import React, { useState } from 'react'
import {
  Box, Grid, Card, CardContent, Typography, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Chip, Tabs, Tab, Dialog, DialogTitle, DialogContent,
  DialogActions, DialogContentText
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

// Mock data for products
const initialProducts = [
  { id: 1, name: 'Men Solid Pure Cotton Straight Kurta', brand: 'Zosh', category: 'Men > Clothing > Kurtas', price: 1299, discountedPrice: 649, discountPercentage: 50, color: 'Green', stock: { S: 10, M: 15, L: 8, XL: 5 } },
  { id: 2, name: 'Men Slim Mid Rise Jeans', brand: 'Roadster', category: 'Men > Clothing > Jeans', price: 1999, discountedPrice: 1099, discountPercentage: 45, color: 'Black', stock: { S: 5, M: 12, L: 20, XL: 10 } },
  { id: 3, name: 'Casual Puff Sleeves Solid Women White Top', brand: 'UniversalOutfit', category: 'Women > Clothing > Tops', price: 1299, discountedPrice: 999, discountPercentage: 23, color: 'White', stock: { S: 8, M: 10, L: 6, XL: 4 } },
  { id: 4, name: 'Men Black Slim Fit T-Shirt', brand: 'Zosh', category: 'Men > Clothing > T-Shirts', price: 899, discountedPrice: 449, discountPercentage: 50, color: 'Black', stock: { S: 20, M: 25, L: 15, XL: 10 } },
  { id: 5, name: 'Women Floral Print Saree', brand: 'Zosh', category: 'Women > Clothing > Sarees', price: 2499, discountedPrice: 1499, discountPercentage: 40, color: 'Red', stock: { S: 5, M: 8, L: 10, XL: 6 } },
]

// Mock data for orders
const initialOrders = [
  { id: 'ORD001', customer: 'Ram Kapoor', date: '2026-07-05', amount: 1299, status: 'Delivered', items: 3 },
  { id: 'ORD002', customer: 'Sita Sharma', date: '2026-07-06', amount: 2499, status: 'Shipped', items: 1 },
  { id: 'ORD003', customer: 'Mohan Das', date: '2026-07-06', amount: 649, status: 'Confirmed', items: 2 },
  { id: 'ORD004', customer: 'Priya Singh', date: '2026-07-07', amount: 1899, status: 'Placed', items: 4 },
  { id: 'ORD005', customer: 'Raj Malhotra', date: '2026-07-07', amount: 999, status: 'Delivered', items: 1 },
]

// Mock analytics data
const analytics = {
  totalEarnings: 1250000,
  paymentVolume: 45000,
  monthlyOverview: [
    { month: 'Jan', amount: 100000 },
    { month: 'Feb', amount: 120000 },
    { month: 'Mar', amount: 90000 },
    { month: 'Apr', amount: 150000 },
    { month: 'May', amount: 180000 },
    { month: 'Jun', amount: 200000 },
  ],
  recentCustomers: [
    { name: 'Ram Kapoor', email: 'ram@example.com', date: '2026-07-05' },
    { name: 'Sita Sharma', email: 'sita@example.com', date: '2026-07-06' },
    { name: 'Mohan Das', email: 'mohan@example.com', date: '2026-07-06' },
  ],
}

const ITEMS_PER_PAGE = 5

const AdminDashboard = () => {
  const [tab, setTab] = useState(0)
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState(initialOrders)
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [productPage, setProductPage] = useState(0)
  const [orderPage, setOrderPage] = useState(0)

  // Add Product form state
  const [form, setForm] = useState({
    name: '', brand: '', category: 'Men > Clothing > Kurtas', price: '', discountedPrice: '', discountPercentage: '', color: '', imageUrl: '', description: '',
    stock: { S: 0, M: 0, L: 0, XL: 0 }
  })

  const handleTabChange = (event, newValue) => setTab(newValue)

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      ...form,
      price: Number(form.price),
      discountedPrice: Number(form.discountedPrice),
      discountPercentage: Number(form.discountPercentage),
      stock: { ...form.stock },
    }
    setProducts([...products, newProduct])
    setForm({
      name: '', brand: '', category: 'Men > Clothing > Kurtas', price: '', discountedPrice: '', discountPercentage: '', color: '', imageUrl: '', description: '',
      stock: { S: 0, M: 0, L: 0, XL: 0 }
    })
    setOpenDialog(false)
  }

  const handleDelete = () => {
    if (deleteId) {
      setProducts(products.filter(p => p.id !== deleteId))
      setDeleteId(null)
      setOpenDialog(false)
    }
  }

  // Product pagination
  const paginatedProducts = products.slice(productPage * ITEMS_PER_PAGE, (productPage + 1) * ITEMS_PER_PAGE)
  const productTotalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  // Order pagination
  const paginatedOrders = orders.slice(orderPage * ITEMS_PER_PAGE, (orderPage + 1) * ITEMS_PER_PAGE)
  const orderTotalPages = Math.ceil(orders.length / ITEMS_PER_PAGE)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success'
      case 'Shipped': return 'info'
      case 'Confirmed': return 'primary'
      case 'Placed': return 'warning'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Admin Dashboard</Typography>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 4 }}>
        <Tab label="Analytics" />
        <Tab label="Products" />
        <Tab label="Orders" />
      </Tabs>

      {/* Analytics Tab */}
      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#9155fd', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Total Earnings</Typography>
                <Typography variant="h4">₹{analytics.totalEarnings.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#4caf50', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Payment Volume</Typography>
                <Typography variant="h4">₹{analytics.paymentVolume.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#ff9800', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4">{orders.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#2196f3', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h4">{products.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Monthly Overview */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Monthly Overview</Typography>
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Amount (₹)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analytics.monthlyOverview.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell>{row.month}</TableCell>
                          <TableCell align="right">{row.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Customers */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Recent Customers</Typography>
                {analytics.recentCustomers.map((customer, idx) => (
                  <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < analytics.recentCustomers.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                    <Typography variant="body1" fontWeight="bold">{customer.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{customer.email}</Typography>
                    <Typography variant="caption" color="text.secondary">{customer.date}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Products Tab */}
      {tab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
              Add New Product
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Discounted Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">₹{product.price}</TableCell>
                    <TableCell align="right">{product.discountPercentage}%</TableCell>
                    <TableCell align="right">₹{product.discountedPrice}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small" onClick={() => { setDeleteId(product.id); setOpenDialog(true) }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
            <Button disabled={productPage === 0} onClick={() => setProductPage(productPage - 1)}>Prev</Button>
            <Typography sx={{ alignSelf: 'center' }}>{productPage + 1} / {productTotalPages}</Typography>
            <Button disabled={productPage >= productTotalPages - 1} onClick={() => setProductPage(productPage + 1)}>Next</Button>
          </Box>
        </Box>
      )}

      {/* Orders Tab */}
      {tab === 2 && (
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="center">Items</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Update Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell align="right">₹{order.amount}</TableCell>
                    <TableCell align="center">{order.items}</TableCell>
                    <TableCell align="center">
                      <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <Select
                          value={order.status}
                          onChange={(e) => {
                            const newStatus = e.target.value
                            setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o))
                          }}
                        >
                          <MenuItem value="Placed">Placed</MenuItem>
                          <MenuItem value="Confirmed">Confirmed</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                          <MenuItem value="Returned">Returned</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
            <Button disabled={orderPage === 0} onClick={() => setOrderPage(orderPage - 1)}>Prev</Button>
            <Typography sx={{ alignSelf: 'center' }}>{orderPage + 1} / {orderTotalPages}</Typography>
            <Button disabled={orderPage >= orderTotalPages - 1} onClick={() => setOrderPage(orderPage + 1)}>Next</Button>
          </Box>
        </Box>
      )}

      {/* Add Product Dialog */}
      <Dialog open={openDialog && !deleteId} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={form.category} label="Category" onChange={e => setForm({ ...form, category: e.target.value })}>
                  <MenuItem value="Men > Clothing > Kurtas">Men > Clothing > Kurtas</MenuItem>
                  <MenuItem value="Men > Clothing > Jeans">Men > Clothing > Jeans</MenuItem>
                  <MenuItem value="Men > Clothing > T-Shirts">Men > Clothing > T-Shirts</MenuItem>
                  <MenuItem value="Women > Clothing > Sarees">Women > Clothing > Sarees</MenuItem>
                  <MenuItem value="Women > Clothing > Tops">Women > Clothing > Tops</MenuItem>
                  <MenuItem value="Women > Clothing > Jeans">Women > Clothing > Jeans</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Actual Price (₹)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Discounted Price (₹)" type="number" value={form.discountedPrice} onChange={e => setForm({ ...form, discountedPrice: e.target.value })} required /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Discount Percentage (%)" type="number" value={form.discountPercentage} onChange={e => setForm({ ...form, discountPercentage: e.target.value })} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Description" multiline rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Stock Quantities (per size)</Typography>
              <Grid container spacing={2}>
                {['S', 'M', 'L', 'XL'].map(size => (
                  <Grid item xs={3} key={size}>
                    <TextField
                      fullWidth
                      label={`Size ${size}`}
                      type="number"
                      value={form.stock[size]}
                      onChange={e => setForm({ ...form, stock: { ...form.stock, [size]: Number(e.target.value) } })}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddProduct}>Add Product</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog && !!deleteId} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminDashboard
