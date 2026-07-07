import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { maincarouseldata } from './maincarouseldata'

const Maincarousel = () => {
    const items = maincarouseldata.map((item) => (
      <div key={item.id} className="relative w-full">
        <img
          className="w-full h-auto"
          src={item.image}
          alt=""
          role="presentation"
        />
      </div>
    ));

  return (
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
        animationDuration={800}
        autoWidth={false}
    />
  );
};

export default Maincarousel;