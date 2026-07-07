import { StarIcon } from '@heroicons/react/20/solid'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../redux/store'
import ProductReviewCard from './ProductReviewCard'
import HomeSectionCard from '../../components/homesectioncarousel/homesectioncarousel'
import { mens_kurta } from '../../Data/menskurta'
import StarRatingInput from './StarRatingInput'

// Dynamic product lookup based on mens_kurta data
const findProduct = (productId) => {
  if (!productId) return mens_kurta[0]
  return mens_kurta.find(p => String(p.id) === String(productId)) || mens_kurta[0]
}

export default function ProductDetails() {
  const { productId } = useParams()
  const product = findProduct(productId)
  const dispatch = useDispatch()
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState('')

  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError('Please select a size before adding to cart')
      return
    }
    setSizeError('')
    dispatch(addToCart({
      ...product,
      selectedSize,
    }))
    navigate("/cart")
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">{breadcrumb.name}</a>
                  <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.name}</a>
            </li>
          </ol>
        </nav>

        <section>
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={12} md={7}>
                <div className="space-y-5">
                  {[1, 1, 1].map((item) => <ProductReviewCard key={item} />)}
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <h1 className="text-xl font-semibold pb-1">Product Rating</h1>
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={4.6} precision={0.5} />
                  <p className="opacity-60">5937 Rating</p>
                </div>
                <Box className="mt-5">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}><p>Excellent</p></Grid>
                    <Grid item xs={10}><LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }} variant="determinate" value={80} color="success" /></Grid>

                    <Grid item xs={2}><p>Outstanding</p></Grid>
                    <Grid item xs={10}><LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }} variant="determinate" value={60} /></Grid>

                    <Grid item xs={2}><p>VeryGood</p></Grid>
                    <Grid item xs={10}><LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }} variant="determinate" value={50} /></Grid>

                    <Grid item xs={2}><p>Good</p></Grid>
                    <Grid item xs={10}><LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }} variant="determinate" value={40} /></Grid>

                    <Grid item xs={2}><p>Average</p></Grid>
                    <Grid item xs={10}><LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }} variant="determinate" value={30} color="error" /></Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Interactive Review Input */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Write a Review</h1>
          <div className="border p-5 bg-white rounded-lg">
            <StarRatingInput onSubmit={(data) => console.log('Review submitted:', data)} />
          </div>
        </section>

        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="flex flex-wrap space-y-5">
            {mens_kurta.map((item) => <HomeSectionCard key={item.id} product={item} />)}
          </div>
        </section>

        <div className="flex flex-col items-center py-10">
          <img alt={product.images[0].alt} src={product.images[0].src} className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]" />
          <div className="flex flex-wrap space-x-5 justify-center mt-4">
            {product.images.slice(1).map((image, i) => (
              <img key={i} alt={image.alt} src={image.src} className="max-w-[5rem] max-h-[5rem]" />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
          <div className="lg:border-r">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">UniversalOutfit</h1>
            <p className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">Casual Puff Sleeves Solid women White Top</p>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
              <p className="font-bold">₹1,999</p>
              <p className="opacity-50 line-through">₹2,111</p>
              <p className="text-green-600 font-semibold">5% OFF</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <Rating name="read-only" value={4} readOnly />
                <p className="opacity-50 text-sm">344 Rating</p>
                <p className="ml-3 opacity-50 text-sm text-indigo-600 hover:text-indigo-500">312 Reviews</p>
              </div>
            </div>

            <form className="mt-10">
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>
                <fieldset aria-label="Choose a size" className="mt-4">
                  <div className="grid grid-cols-4 gap-3">
                    {product.sizes.map((size, idx) => (
                      <label key={idx} aria-label={size.name} className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
                        <input checked={selectedSize === size.name} onChange={() => { setSelectedSize(size.name); setSizeError('') }} name="size" type="radio" disabled={!size.inStock} className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
                        <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">{size.name}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {sizeError && <p className="text-red-500 text-sm mt-2">{sizeError}</p>}
              </div>
              <button onClick={handleAddToCart} type="button" variant="contained" sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }} className="mt-6">
                Add to Cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400"><span className="text-gray-600">{highlight}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
