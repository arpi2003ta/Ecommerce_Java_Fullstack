export const subCategories = [
  { name: 'Kurta', href: '/products/kurta' },
  { name: 'Jeans', href: '/products/jeans' },
  { name: 'T-Shirts', href: '/products/tshirts' },
  { name: 'Shirts', href: '/products/shirts' },
  { name: 'Shoes', href: '/products/shoes' },
  { name: 'Watches', href: '/products/watches' },
];

export const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'men', label: 'Men', checked: false },
      { value: 'women', label: 'Women', checked: false },
      { value: 'kids', label: 'Kids', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'green', label: 'Green', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'white', label: 'White', checked: false },
      { value: 'black', label: 'Black', checked: false },
      { value: 'red', label: 'Red', checked: false },
      { value: 'navy', label: 'Navy', checked: false },
      { value: 'maroon', label: 'Maroon', checked: false },
      { value: 'ivory', label: 'Ivory', checked: false },
      { value: 'coral', label: 'Coral', checked: false },
      { value: 'gold', label: 'Gold', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
      { value: 'XL', label: 'XL', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { value: '0-500', label: 'Under ₹500', checked: false },
      { value: '500-1000', label: '₹500 - ₹1000', checked: false },
      { value: '1000-2000', label: '₹1000 - ₹2000', checked: false },
      { value: '2000-5000', label: '₹2000 - ₹5000', checked: false },
      { value: '5000+', label: 'Above ₹5000', checked: false },
    ],
  },
  {
    id: 'discount',
    name: 'Discount Range',
    options: [
      { value: '30', label: '30% or more', checked: false },
      { value: '40', label: '40% or more', checked: false },
      { value: '50', label: '50% or more', checked: false },
      { value: '70', label: '70% or more', checked: false },
    ],
  },
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { value: 'in stock', label: 'In Stock', checked: false },
      { value: 'out of stock', label: 'Out of Stock', checked: false },
    ],
  },
];
