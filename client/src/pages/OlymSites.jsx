import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBarS from '../search/SearchBarS';
export default function OlymSites() {
    const navigate = useNavigate();

    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await axios.get('/olympic-sites');
                setSites(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSites();
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const handleSiteClick = (id) => {
        navigate(`/site/${id}`);
    };
    return (
        <div>
             <h1 className="text-3xl font-bold mb-4 text-center">sites olympiques</h1>
             <SearchBarS />
             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
           
        
                {sites.length > 0 && sites.map((site, index) => (
                    <div
                        key={index}
                        className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleSiteClick(site.code_site)}
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
