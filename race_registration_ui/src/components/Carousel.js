// src/components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { useNavigate } from 'react-router-dom';

function Carousel({ images }) {
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        adaptiveHeight: true, // Adjusts the height of the carousel for each image
  };

  const handleClick = (path) => {
    navigate(path);
}

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={image.altText} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
