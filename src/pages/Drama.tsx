import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DramaCard from '../components/DramaCard';

const Drama: React.FC = () => {
  const [dramas, setDramas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TMDB API Details
  const API_KEY = '8049dcc0e794d4c36e976956d1f6826b'; 
  const URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc`;

  useEffect(() => {
    const fetchAllDramas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        // TMDB ek page par 20 results deta hai
        setDramas(response.data.results); 
      } catch (error) {
        console.error("Error fetching dramas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDramas();
  }, []);

  return (
    <div className="bg-brandLight min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-12 border-l-8 border-brandOrange pl-6">
          <h1 className="text-5xl font-black text-brandDark uppercase tracking-tighter">
            All <span className="text-brandOrange">K-Dramas</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Explore our complete collection of Korean Series</p>
        </div>

        {/* Dramas Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-brandOrange"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {dramas.map((item) => {
              // Mapping API data to our DramaCard format
              const mappedData = {
                id: item.id,
                title: item.name,
                rating: item.vote_average.toFixed(1),
                genre: ["K-Drama"],
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                releaseYear: new Date(item.first_air_date).getFullYear(),
              };

              return <DramaCard key={mappedData.id} drama={mappedData as any} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drama;