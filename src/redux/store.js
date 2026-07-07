import { configureStore, createSlice } from '@reduxjs/toolkit';

// Load persisted state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

/* ---------- Auth Slice ---------- */
const authSlice = createSlice({
  name: 'auth',
  initialState: loadState()?.auth || { user: null, token: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('jwt', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

/* ---------- Cart Slice ---------- */
const cartSlice = createSlice({
  name: 'cart',
  initialState: loadState()?.cart || { cart: [], totalItem: 0, totalPrice: 0, totalDiscount: 0, delivery: 0, totalPayable: 0 },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalItem += 1;
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.cart.find(i => i.id === id);
      if (item) {
        state.totalItem -= item.quantity;
      }
      state.cart = state.cart.filter(item => item.id !== id);
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(i => i.id === id);
      if (item) {
        const diff = quantity - item.quantity;
        state.totalItem += diff;
        item.quantity = quantity;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalItem = 0;
      state.totalPrice = 0;
      state.totalDiscount = 0;
      state.delivery = 0;
      state.totalPayable = 0;
    },
    calculateTotals: (state) => {
      let totalPrice = 0;
      let totalDiscount = 0;
      state.cart.forEach(item => {
        const price = Number(item.price || 0);
        const discountedPrice = Number(item.discountedPrice || item.price || 0);
        totalPrice += price * item.quantity;
        totalDiscount += (price - discountedPrice) * item.quantity;
      });
      const delivery = totalPrice > 500 ? 0 : 40;
      state.totalPrice = totalPrice;
      state.totalDiscount = totalDiscount;
      state.delivery = delivery;
      state.totalPayable = totalPrice - totalDiscount + delivery;
    },
  },
});

/* ---------- Product Slice ---------- */
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filters: {},
    sortBy: 'popularity',
    currentPage: 1,
    itemsPerPage: 10,
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.currentPage = 1;
    },
    removeFilter: (state, action) => {
      delete state.filters[action.payload];
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

/* ---------- Order Slice ---------- */
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    addOrder: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.items.find(o => o.id === orderId || o._id === orderId);
      if (order) {
        order.status = status;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

/* ---------- Exports ---------- */
export const { login, logout, setUser } = authSlice.actions;
export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotals } = cartSlice.actions;
export const { setProducts, setFilter, removeFilter, clearFilters, setSortBy, setPage, setLoading: setProductLoading } = productSlice.actions;
export const { setOrders, addOrder, updateOrderStatus, setLoading: setOrderLoading } = orderSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    orders: orderSlice.reducer,
  },
  preloadedState: loadState(),
});

// Persist cart state to localStorage on every change
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

export default store;
