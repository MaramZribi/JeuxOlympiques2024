import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sports() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    axios.get('/sports')
      .then(response => {
        setSports(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des sports:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Tous les sports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sports.map((sport, index) => (
          <Link to={`/agenda/${sport.sport}`} key={index} className="block border  shadow-lg overflow-hidden">
            <img src={sport.image} alt={sport.sport} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{sport.sport}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
