import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function TravelTimeCalculator() {
  const [planning, setPlanning] = useState([{ date: '', site: '' }]);
  const [totalTravelTime, setTotalTravelTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [siteNames, setSiteNames] = useState([]);
  const [showDropdown, setShowDropdown] = useState({});

  const dropdownRefs = useRef([]);

  useEffect(() => {
    axios.get('http://localhost:4000/site_names')
      .then(response => {
        const uniqueSiteNames = [...new Set(response.data)];
        setSiteNames(uniqueSiteNames);
      })
      .catch(error => {
        console.error('Error fetching site names:', error);
      });
  }, []);

  const handleChange = (index, field, value) => {
    const newPlanning = [...planning];
    newPlanning[index][field] = value;
    setPlanning(newPlanning);
  };

  const handleAddRow = () => {
    setPlanning([...planning, { date: '', site: '' }]);
  };

  const handleSiteClick = (index, field) => {
    setShowDropdown({ ...showDropdown, [`${index}-${field}`]: true });
  };

  const handleSiteSelect = (index, field, value) => {
    handleChange(index, field, value);
    setShowDropdown({ ...showDropdown, [`${index}-${field}`]: false });
  };

  const handleOutsideClick = (event) => {
    dropdownRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        setShowDropdown(prevState => ({ ...prevState, [index]: false }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTotalTravelTime(null);

    try {
      const response = await axios.post('http://localhost:4000/calculate-travel-time', { planning }, { withCredentials: true });
      setTotalTravelTime(response.data.totalTravelTime);
    } catch (err) {
      setError(err.response ? err.response.data.details : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Calculer la durée totale du trajet</h1>
      <div className="flex justify-center  items-center w-4/5 h-[450px] bg-gray-300 overflow-hidden mx-auto mb-8">
        <img
          src="https://medias.cerveauetpsycho.fr/api/v1/images/view/5fa2bc40d286c2393915cd56/wide_1300/image.jpg"
          alt="Route Planning"
          className="rounded-lg shadow-lg "
        />
      </div>
      <form onSubmit={handleSubmit}>
        {planning.map((plan, index) => (
          <div key={index} className="mb-4 grid grid-cols-2 gap-4">
            <input
              type="date"
              value={plan.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <div className="relative w-full" ref={el => dropdownRefs.current[index] = el}>
              <input
                type="text"
                value={plan.site}
                onChange={(e) => handleChange(index, 'site', e.target.value)}
                onFocus={() => handleSiteClick(index, 'site')}
                className="w-full p-2 border rounded"
                placeholder="Site"
                required
              />
              {showDropdown[`${index}-site`] && (
                <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-48 overflow-auto">
                  {siteNames.map((siteName, i) => (
                    <li
                      key={i}
                      onClick={() => handleSiteSelect(index, 'site', siteName)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {siteName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRow}
          className="px-4 py-2 bg-sky-950 text-white font-semibold rounded mb-4"
        >
          Ajouter une ligne
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded"
        >
          Calculer le trajet totale
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {totalTravelTime !== null && (
       <div className="text-xl mt-4">
       <p>Temps de trajet total : {totalTravelTime} minutes</p>
       <p>
         Ce temps de trajet total a été calculé en fonction des distances entre les sites sélectionnés, 
         en utilisant la formule de Haversine pour déterminer les distances géographiques, et en supposant une vitesse moyenne de déplacement de 50 km/h.
       </p>
     </div>
      )}
    </div>
  );
}
