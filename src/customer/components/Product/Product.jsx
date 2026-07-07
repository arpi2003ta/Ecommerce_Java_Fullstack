import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import { subCategories, filters as filterData } from './FiltreData'
import { mens_kurta } from '../../Data/menskurta'
import { setFilter, removeFilter, setSortBy, setPage, clearFilters } from '../../../redux/store'

const ITEMS_PER_PAGE = 8

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { levelOne, levelTwo, levelThree, levelFour } = useParams()
  const dispatch = useDispatch()

  // Read state from URL
  const currentPage = Number(searchParams.get('page') || 1)
  const sortBy = searchParams.get('sort') || 'popularity'
  const selectedColors = searchParams.get('color') ? searchParams.get('color').split(',') : []
  const selectedSizes = searchParams.get('size') ? searchParams.get('size').split(',') : []
  const selectedPrice = searchParams.get('price') || ''
  const selectedDiscount = searchParams.get('discount') || ''
  const selectedAvailability = searchParams.get('availability') || ''
  const selectedCategory = searchParams.get('category') || ''

  // Update URL helper
  const updateFilter = (key, value) => {
    if (value && value !== '') {
      setSearchParams(prev => {
        prev.set(key, value)
        prev.set('page', '1')
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.delete(key)
        prev.set('page', '1')
        return prev
      })
    }
  }

  const handleColorChange = (color) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color]
    updateFilter('color', newColors.join(','))
  }

  const handleSizeChange = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size]
    updateFilter('size', newSizes.join(','))
  }

  const handlePriceChange = (price) => {
    updateFilter('price', selectedPrice === price ? '' : price)
  }

  const handleDiscountChange = (discount) => {
    updateFilter('discount', selectedDiscount === discount ? '' : discount)
  }

  const handleCategoryChange = (category) => {
    updateFilter('category', selectedCategory === category ? '' : category)
  }

  const handleAvailabilityChange = (availability) => {
    updateFilter('availability', selectedAvailability === availability ? '' : availability)
  }

  const handleSortChange = (sort) => {
    setSearchParams(prev => { prev.set('sort', sort); return prev })
  }

  const handlePageChange = (page) => {
    setSearchParams(prev => { prev.set('page', String(page)); return prev })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...mens_kurta]

    // Category filter from URL params
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Brand filter
    if (levelTwo === 'brands' && levelThree) {
      const brandSlug = levelThree.replace(/-/g, ' ').toLowerCase()
      result = result.filter(p => p.brand.toLowerCase().replace(/[^a-z0-9]/g, '') === brandSlug.replace(/[^a-z0-9]/g, ''))
    }

    // Route-based filters
    if (levelOne && levelTwo && levelThree && levelTwo !== 'brands') {
      result = result.filter(p => {
        const categoryMatch = !levelOne || p.category === levelOne
        const subCategoryMatch = !levelTwo || p.subCategory === levelTwo
        const typeMatch = !levelThree || p.type === levelThree
        return categoryMatch && subCategoryMatch && typeMatch
      })
    }

    // URL-driven filters
    if (selectedColors.length > 0) {
      result = result.filter(p => selectedColors.some(c => p.color?.some(productColor => productColor.toLowerCase() === c.toLowerCase())))
    }
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s.name?.toUpperCase())))
    }
    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-').map(Number)
      result = result.filter(p => {
        const effectivePrice = p.discountedPrice || p.price
        if (max) {
          return effectivePrice >= min && effectivePrice <= max
        }
        return effectivePrice >= min
      })
    }
    if (selectedDiscount) {
      const minDiscount = Number(selectedDiscount)
      result = result.filter(p => (p.discountPercentage || 0) >= minDiscount)
    }
    if (selectedAvailability) {
      result = result.filter(p => (p.availability || '').toLowerCase() === selectedAvailability.toLowerCase())
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price))
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price))
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    return result
  }, [levelOne, levelTwo, levelThree, levelFour, selectedColors, selectedSizes, selectedPrice, selectedDiscount, selectedAvailability, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const sortOptions = [
    { name: 'Most Popular', value: 'popularity' },
    { name: 'Best Rating', value: 'rating' },
    { name: 'Price: Low to High', value: 'price-low' },
    { name: 'Price: High to Low', value: 'price-high' },
  ]

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel transition className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <form className="mt-4 border-t border-gray-200">
                {filterData.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                         {section.options.map((option, optionIdx) => (
                           <div key={option.value} className="flex gap-3">
                             <div className="flex h-5 shrink-0 items-center">
                               <div className="group grid size-4 grid-cols-1">
                                 {['price', 'discount', 'category', 'availability'].includes(section.id) ? (
                                   <input
                                     checked={
                                       section.id === 'price' ? selectedPrice === option.value :
                                       section.id === 'discount' ? selectedDiscount === option.value :
                                       section.id === 'category' ? selectedCategory === option.value :
                                       selectedAvailability === option.value
                                     }
                                     onChange={() => {
                                       if (section.id === 'price') handlePriceChange(option.value)
                                       else if (section.id === 'discount') handleDiscountChange(option.value)
                                       else if (section.id === 'category') handleCategoryChange(option.value)
                                       else if (section.id === 'availability') handleAvailabilityChange(option.value)
                                     }}
                                     id={`filter-mobile-${section.id}-${optionIdx}`}
                                     name={`${section.id}[]`}
                                     type="radio"
                                     className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 forced-colors:appearance-auto"
                                   />
                                 ) : (
                                   <input
                                     checked={(section.id === 'color' ? selectedColors : selectedSizes).includes(option.value)}
                                     onChange={() => section.id === 'color' ? handleColorChange(option.value) : handleSizeChange(option.value)}
                                     id={`filter-mobile-${section.id}-${optionIdx}`}
                                     name={`${section.id}[]`}
                                     type="checkbox"
                                     className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 forced-colors:appearance-auto"
                                   />
                                 )}
                                 <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
                                   <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                                   <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
                                 </svg>
                               </div>
                             </div>
                             <label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="min-w-0 flex-1 text-gray-500">
                               {option.label}
                             </label>
                           </div>
                         ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {levelTwo === 'brands' && levelThree ? levelThree.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : levelTwo ? levelTwo.charAt(0).toUpperCase() + levelTwo.slice(1) : 'New Arrivals'}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort: {sortOptions.find(s => s.value === sortBy)?.name || 'Most Popular'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
                </MenuButton>
                <MenuItems transition className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value}>
                        <button onClick={() => handleSortChange(option.value)} className={classNames(sortBy === option.value ? 'font-medium text-gray-900' : 'text-gray-500', 'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden w-full text-left')}>
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button type="button" onClick={() => setMobileFiltersOpen(true)} className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters - Desktop */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {filterData.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                {['price', 'discount', 'category', 'availability'].includes(section.id) ? (
                                  <input
                                    checked={
                                      section.id === 'price' ? selectedPrice === option.value :
                                      section.id === 'discount' ? selectedDiscount === option.value :
                                      section.id === 'category' ? selectedCategory === option.value :
                                      selectedAvailability === option.value
                                    }
                                    onChange={() => {
                                      if (section.id === 'price') handlePriceChange(option.value)
                                      else if (section.id === 'discount') handleDiscountChange(option.value)
                                      else if (section.id === 'category') handleCategoryChange(option.value)
                                      else if (section.id === 'availability') handleAvailabilityChange(option.value)
                                    }}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="radio"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 forced-colors:appearance-auto"
                                  />
                                ) : (
                                  <input
                                    checked={(section.id === 'color' ? selectedColors : selectedSizes).includes(option.value)}
                                    onChange={() => section.id === 'color' ? handleColorChange(option.value) : handleSizeChange(option.value)}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 forced-colors:appearance-auto"
                                  />
                                )}
                                <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
                                  <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                                  <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {(selectedColors.length > 0 || selectedSizes.length > 0 || selectedPrice || selectedDiscount || selectedCategory || selectedAvailability) && (
                  <button type="button" onClick={() => { dispatch(clearFilters()); setSearchParams(prev => { prev.delete('color'); prev.delete('size'); prev.delete('price'); prev.delete('discount'); prev.delete('category'); prev.delete('availability'); prev.delete('page'); return prev }) }} className="mt-4 text-sm text-indigo-600 hover:text-indigo-500">
                    Clear all filters
                  </button>
                )}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4">
                {filteredProducts.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">No products found matching your filters.</p>
                ) : (
                  <div className='flex flex-wrap justify-center bg-white py-5'>
                    {paginatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50">Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button key={page} onClick={() => handlePageChange(page)} className={classNames("w-10 h-10 rounded flex items-center justify-center", currentPage === page ? "bg-indigo-600 text-white" : "border hover:bg-gray-50")}>{page}</button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50">Next</button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
