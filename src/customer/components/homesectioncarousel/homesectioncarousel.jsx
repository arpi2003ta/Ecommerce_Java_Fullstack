import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Button } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material'
import { featuredProducts } from '../../pages/homepage/featuredData'
import { bestSellers } from '../../pages/homepage/bestSellerData'
import { newArrivals } from '../../pages/homepage/newArrivalData'
import { topRatedProducts } from '../../pages/homepage/topRatedData'
import { trendingNowProducts } from '../../pages/homepage/trendingNowData'
import { specialOffers } from '../../pages/homepage/specialOffersData'

const responsive = {
  0: { items: 1 },
  720: { items: 2 },
  1024: { items: 5.5 },
};

const HomeSectionCarousel = ({ homesectioncard: HomeSectionCard, sectionName }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const containerRef = React.useRef(null);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = (item) => setActiveIndex(item);

  const handleWheel = React.useCallback((e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 0) {
        setActiveIndex((prev) => prev + 1);
      } else {
        setActiveIndex((prev) => prev - 1);
      }
    }
  }, []);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const useFeaturedProducts = sectionName === "Featured Products"
  const useBestSellers = sectionName === "Best Sellers"
  const useNewArrivals = sectionName === "New Arrivals"
  const useTopRated = sectionName === "Top Rated"
  const useTrendingNow = sectionName === "Trending Now"
  const useSpecialOffers = sectionName === "Special Offers"
  const items =
    (useFeaturedProducts && featuredProducts.length
      ? featuredProducts.map((product, idx) => <HomeSectionCard key={idx} product={product} />)
      : useBestSellers && bestSellers.length
        ? bestSellers.map((product, idx) => <HomeSectionCard key={idx} product={product} />)
        : useNewArrivals && newArrivals.length
          ? newArrivals.map((product, idx) => <HomeSectionCard key={idx} product={product} />)
          : useTopRated && topRatedProducts.length
            ? topRatedProducts.map((product, idx) => <HomeSectionCard key={idx} product={product} />)
            : useTrendingNow && trendingNowProducts.length
              ? trendingNowProducts.map((product, idx) => <HomeSectionCard key={idx} product={product} />)
              : useSpecialOffers && specialOffers.length
                ? specialOffers.map((product, idx) => <HomeSectionCard key={idx} product={product} />)
                : [1, 1, 1, 1, 1, 1, 1, 1].map((item, idx) => <HomeSectionCard key={idx} />));

  const showNext = activeIndex < items.length - 2
  const showPrev = activeIndex > 0

  return (
    <div ref={containerRef} className='border'>
      <h2 className="text-2xl font-extrabold text-gray-800 px-5">{sectionName}</h2>
      <div className='relative px-5'>
        <AliceCarousel
          mouseTracking
          swipeable
          touchTracking
          buttonDisabledClassName="alice-carousel__disabled-btn"
          items={items}
          disableButtonControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          responsive={responsive}
        />
        {showPrev && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slidePrev}
            sx={{ position: 'absolute', top: '8rem', left: '0rem', transform: 'translate(50%) rotate(-90deg)', color: 'white', bgcolor: 'black' }}
            aria-label="prev"
          >
            <KeyboardArrowLeft />
          </Button>
        )}
        {showNext && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slideNext}
            sx={{ position: 'absolute', top: '8rem', right: '0rem', transform: 'translate(50%) rotate(90deg)', color: 'white', bgcolor: 'black' }}
            aria-label="next"
          >
            <KeyboardArrowLeft />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
