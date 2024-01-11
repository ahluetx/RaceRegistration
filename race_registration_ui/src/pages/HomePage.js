// src/pages/HomePage.js
//import React from 'react';
import React, { useEffect, useState, useRef } from 'react';
import Carousel from '../components/Carousel';
import RaceInfoSection from '../components/RaceInfoSection';
import './HomePage.css'; 

function HomePage() {
  const [showRaceInfo, setShowRaceInfo] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const carouselHeight = carouselRef.current.clientHeight;
        setShowRaceInfo(window.scrollY > carouselHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const carouselImages = [
    { url: '/cwd_logo.png', altText: 'Race Event 1' },
    { url: '/smileInc_logo.webp', altText: 'Race Event 2' },
    { url: '/24_RFPTile.jpg', altText: 'Race Event 3' },
    { url: '/GovernorsCup_2015_logo.png', altText: 'Race Event 4' },

  ]
  const races = [
        // Array of race objects with logoUrl, name, and description
        { logoUrl: '/cwd_logo.png',
          name: 'Race Event 1',
          description: 'fake race text'
        },
        { logoUrl: '/smileInc_logo.webp',
        name: 'Race Event 2',
        description: 'first race on the thing'
      },
      { logoUrl: '/24_RFPTile.jpg',
          name: 'Race Event 3',
          description: 'first race on the thing'
        },
        { logoUrl: '/GovernorsCup_2015_logo.png',
          name: 'Race Event 4',
          description: 'first race on the thing'
        },
  ];

  return (
    <div className="home-page">
      <div ref={carouselRef}>
        <Carousel images={carouselImages} />
      </div>
      <div className={`race-info-section ${showRaceInfo ? 'visible' : ''}`}>
        <RaceInfoSection races={races} />
      </div>
    </div>
  );
}

export default HomePage;
