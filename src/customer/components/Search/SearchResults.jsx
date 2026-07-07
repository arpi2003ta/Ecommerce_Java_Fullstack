import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ProductCard from '../../components/Product/ProductCard'
import { mens_kurta } from '../../Data/menskurta'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const navigate = useNavigate()
  const [input, setInput] = React.useState(query)

  React.useEffect(() => {
    setInput(query)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (input.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(input.trim())}`)
    }
  }

  const filteredProducts = mens_kurta.filter(product => {
    if (!query) return true
    const searchTerm = query.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    )
  })

  const banners = [
    {
      id: 1,
      image: '/carousel_images/9c747e2db7f8be2a4fa78949a62e5922.jpg',
      title: 'Summer Collection',
      subtitle: 'Up to 50% off',
    },
    {
      id: 2,
      image: '/carousel_images/bc3685a9d258d94c46ede838b118d96c.jpg',
      title: 'New Arrivals',
      subtitle: 'Shop the latest trends',
    },
  ]

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {query ? `Search results for "${query}"` : 'All Products'}
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          {banners.map((banner) => (
            <div key={banner.id} className='relative overflow-hidden rounded-lg cursor-pointer group'>
              <img
                src={banner.image}
                alt={banner.title}
                className='w-full h-48 sm:h-56 object-cover object-center transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white'>
                <h2 className='text-2xl font-bold'>{banner.title}</h2>
                <p className='text-sm sm:text-base mt-1'>{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </form>

        <div className='flex flex-wrap'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
