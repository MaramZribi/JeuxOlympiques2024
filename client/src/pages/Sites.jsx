import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import axios from "axios";
export default function Sites() {

  const [sites, setSites] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get('/sites').then(({ data }) => {
        setSites(data);
      });

    } catch (error) {
      console.log(error);
    }

  }, []);

  const handleSiteClick = (id) => {
    navigate(`/site/${id}`);
  };

  return (
    <div>
    <SearchBar />
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {sites.length > 0 && sites.map((site, index) => (
        <div 
          key={index}
          className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleSiteClick(site._id)}
        >
          <img src={site.image} alt={site.nom_site} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{site.nom_site}</div>
          </div>
        </div>
      ))}
    </div>
  </div>


  );
}
