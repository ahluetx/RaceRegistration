// src/components/RaceInfoSection.js
import React from 'react';
import { motion } from 'framer-motion';
import './RaceInfoSection.css'; // Ensure you have the corresponding CSS file

function RaceInfoSection({ races }) {
  return (
    <div className="race-info-section">
      {races.map((race, index) => (
        <motion.div 
          key={index} 
          className={`race-info-item ${index % 2 === 0 ? 'left' : 'right'}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={race.logoUrl} alt={race.name} className="race-logo" />
          <div className="race-description">
            <h3>{race.name}</h3>
            <p>{race.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default RaceInfoSection;
