import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function SearchResult() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sports = searchParams.get("sports");
    const utilisation = searchParams.get("utilisation");
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");

    useEffect(() => {
        // Construct query parameters
        const queryParams = {};
        if (sports) queryParams.sports = sports;
        if (utilisation) queryParams.utilisation = utilisation;
        if (start_date) queryParams.start_date = start_date;
        if (end_date) queryParams.end_date = end_date;

        // Make API call with query parameters if at least one field is provided
        if (Object.keys(queryParams).length > 0) {
            axios.get('/search', { params: queryParams })
                .then(({ data }) => {
                    setSearchResults(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError("Error fetching search results");
                    setLoading(false);
                });
        } else {
            // If no input fields are provided, set search results to empty array
            setSearchResults([]);
            setLoading(false);
        }
    }, [sports, utilisation, start_date, end_date]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {searchResults.length > 0 && searchResults.map((site, index) => (
                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <img src={site.image} alt={site.nom_site} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{site.nom_site}</div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}
