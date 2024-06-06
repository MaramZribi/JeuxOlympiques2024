import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddressLink from "../AddressLink";
import axios from "axios";

export default function SitePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/'); // Rediriger vers la page d'accueil si aucun ID n'est fourni
      return;
    }
    axios.get(`/sites/${id}`)
      .then(response => {
        setPlace(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        // Rediriger vers une page d'erreur ou d'accueil en cas d'échec de la requête
      });
  }, [id]);
  console.log(place);
  if (!place) {
    return <p className="text-center mt-10">Chargement des données du site...</p>;
  }

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">{place.nom_site}</h1>
      <AddressLink className="my-2 block text-center">{place.nom_site}</AddressLink>
      <div className="flex justify-center items-center w-4/5 h-[600px] bg-gray-300 overflow-hidden mx-auto">
        <img src={place.image} alt={`Vue du ${place.nom_site}`} className="w-full h-full object-cover" />
      </div>
      <div className="my-8">
        <div className="flex items-center mb-2">
          <span>
            <svg viewBox="0 0 1024 1024" className="icon mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30" height="30">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M597.333333 192m-106.666666 0a106.666667 106.666667 0 1 0 213.333333 0 106.666667 106.666667 0 1 0-213.333333 0Z" fill="#9f9c99"></path>
                <path d="M618.666667 582.4l-196.266667-87.466667c-21.333333-10.666667-32 21.333333-42.666667 42.666667s-87.466667 153.6-81.066666 177.066667c6.4 19.2 23.466667 29.866667 40.533333 29.866666 4.266667 0 8.533333 0 12.8-2.133333L614.4 661.333333c17.066667-4.266667 29.866667-21.333333 29.866667-38.4s-10.666667-34.133333-25.6-40.533333z" fill="#00147a"></path>
                <path d="M571.733333 324.266667l-46.933333-21.333334c-27.733333-12.8-61.866667 0-74.666667 27.733334L196.266667 876.8c-10.666667 21.333333 0 46.933333 21.333333 57.6 6.4 2.133333 12.8 4.266667 19.2 4.266667 17.066667 0 32-8.533333 38.4-23.466667 0 0 204.8-283.733333 221.866667-317.866667s104.533333-198.4 104.533333-198.4c10.666667-27.733333 0-61.866667-29.866667-74.666666z" fill="#00147a"></path>
                <path d="M864 334.933333c-14.933333-17.066667-42.666667-21.333333-59.733333-6.4l-106.666667 89.6-136.533333-74.666666c-23.466667-12.8-55.466667-8.533333-70.4 19.2-17.066667 27.733333-8.533333 61.866667 17.066666 72.533333l177.066667 72.533333c6.4 2.133333 12.8 4.266667 19.2 4.266667 10.666667 0 19.2-4.266667 27.733333-10.666667l128-106.666666c17.066667-14.933333 19.2-40.533333 4.266667-59.733334zM249.6 492.8l72.533333-108.8 98.133334 12.8 32-66.133333c8.533333-19.2 25.6-29.866667 44.8-32h-196.266667c-14.933333 0-27.733333 6.4-36.266667 19.2l-85.333333 128c-12.8 19.2-8.533333 46.933333 12.8 59.733333 4.266667 4.266667 12.8 6.4 21.333333 6.4 12.8 0 27.733333-6.4 36.266667-19.2z" fill="#9f9c99"></path>
              </g>
            </svg>
          </span>
          <h2 className="text-2xl font-semibold">Sports:</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {place.sports && place.sports.length > 0 ? place.sports.map((sport, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-center space-x-4 w-1/2 md:w-1/3 lg:w-1/4">

              <div>
                <h3 className="text-xl font-bold">{sport}</h3>
                <Link to={`/agenda/${sport}`} className="text-blue-500 underline">Voir agenda</Link>
              </div>
            </div>
          )) : <p>Aucun sport disponible</p>}
        </div>
      </div>
    </div>
  );
}