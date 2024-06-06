import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RoutePlanner() {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [sites, setSites] = useState([]);
  const [showDropdown, setShowDropdown] = useState({ address1: false, address2: false });

  useEffect(() => {
    axios.get('/sites-names')
      .then(response => {
        setSites(response.data);
      })
      .catch(error => {
        console.error('Error fetching sites:', error);
      });
  }, []);

  const handleSelect = (addressField, siteName) => {
    if (addressField === 'address1') {
      setAddress1(siteName);
    } else if (addressField === 'address2') {
      setAddress2(siteName);
    }
    setShowDropdown({ ...showDropdown, [addressField]: false });
  };

  const generateGoogleMapsLink = () => {
    if (address1 && address2) {
      return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(address1)}&destination=${encodeURIComponent(address2)}`;
    } else {
      return '#';
    }
  };

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Planifiez votre trajet</h1>
      <div className="flex justify-center mb-8">
        <img
          src="https://img.freepik.com/photos-premium/carte-navigation-abstraite-pliee-broche-cible-fond-blanc_476612-5283.jpg"
          alt="Route Planning"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mb-4 relative">
        <label className="block mb-2 font-semibold">Adresse de départ :</label>
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          onFocus={() => setShowDropdown({ ...showDropdown, address1: true })}
          onBlur={() => setTimeout(() => setShowDropdown({ ...showDropdown, address1: false }), 100)} // To handle click outside
          className="w-full p-2 border rounded"
          placeholder="Entrez l'adresse de départ"
        />
        {showDropdown.address1 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-48 overflow-auto">
            {sites.map((site) => (
              <li
                key={site._id}
                onMouseDown={() => handleSelect('address1', site.nom_site)} // onMouseDown to prevent onBlur firing first
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {site.nom_site}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4 relative">
        <label className="block mb-2 font-semibold">Adresse de destination :</label>
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          onFocus={() => setShowDropdown({ ...showDropdown, address2: true })}
          onBlur={() => setTimeout(() => setShowDropdown({ ...showDropdown, address2: false }), 100)} // To handle click outside
          className="w-full p-2 border rounded"
          placeholder="Entrez l'adresse de destination"
        />
        {showDropdown.address2 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-48 overflow-auto">
            {sites.map((site) => (
              <li
                key={site._id}
                onMouseDown={() => handleSelect('address2', site.nom_site)} // onMouseDown to prevent onBlur firing first
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {site.nom_site}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-center">
        <a
          href={generateGoogleMapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-sky-950 text-white font-semibold rounded"
        >
          Voir le trajet sur Google Maps
        </a>
      </div>
    </div>
  );
}
