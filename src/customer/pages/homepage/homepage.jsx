import React from 'react'
import MainCarousel from '../../components/homecarousel/maincarousel'
import HomeSectionCarousel from '../../components/homesectioncarousel/homesectioncarousel'
import HomeSectionCard from './homesectioncard'

const Homepage = () => {
  return (
    <div>
      <MainCarousel />

      <div className="space-y-10 py-20 flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousel homesectioncard={HomeSectionCard} sectionName="Featured Products" />
        <HomeSectionCarousel homesectioncard={HomeSectionCard} sectionName="Best Sellers" />
        <HomeSectionCarousel homesectioncard={HomeSectionCard} sectionName="New Arrivals" />
        <HomeSectionCarousel homesectioncard={HomeSectionCard} sectionName="Top Rated" />
        <HomeSectionCarousel homesectioncard={HomeSectionCard} sectionName="Trending Now" />
        <HomeSectionCarousel homesectioncard={HomeSectionCard} sectionName="Special Offers" />
      </div>
    </div>
  )
}

export default Homepage