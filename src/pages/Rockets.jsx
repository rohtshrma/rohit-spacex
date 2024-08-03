// src/components/Rockets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

const Rockets = () => {
  const [rockets, setRockets] = useState([]);
  const [selectedRocket, setSelectedRocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await axios.get('https://api.spacexdata.com/v4/rockets');
        setRockets(response.data);
      } catch (error) {
        console.error('Error fetching rocket data:', error);
      }
    };

    fetchRockets();
  }, []);

  const handleRocketClick = (rocket) => {
    setSelectedRocket(rocket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRocket(null);
  };

  return (
    <div>
      <h2>Rockets</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {rockets.map((rocket) => (
          <div key={rocket.id} style={{ cursor: 'pointer' }} onClick={() => handleRocketClick(rocket)}>
            <img
              src={rocket.flickr_images[0]} // Use the first image from the flickr_images array
              alt={rocket.name}
              style={{ width: '200px', height: '200px', borderRadius: '8px' }}
            />
            <h3>{rocket.name}</h3>
          </div>
        ))}
      </div>
      {selectedRocket && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          rocket={selectedRocket}
        />
      )}
    </div>
  );
};

export default Rockets;
