import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DramaCard from '../components/DramaCard';

const Upcoming: React.FC = () => {
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '8049dcc0e794d4c36e976956d1f6826b'; 
  // 💡 Logic: '&with_original_language=ko' ensures ONLY Korean content
  const URL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&with_original_language=ko`;

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        setUpcoming(response.data.results);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  return (
    <div className="bg-brandOrange min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="mb-12 border-l-8 border-white pl-6">
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter animate-pulse">
            Upcoming <span className="text-brandDark">Korean Hits</span>
          </h1>
          <p className="text-white/90 mt-2 font-bold text-lg italic">The most anticipated K-Dramas of 2026!</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {upcoming.map((item) => {
              const mappedData = {
                id: item.id,
                title: item.name,
                rating: "TBA",
                genre: ["Upcoming"],
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                releaseYear: "Coming Soon",
              };

              return (
                /* 💡 Logic: Yahan humne wahi animation lagayi jo Home page par hai */
                <div key={item.id} >                   <DramaCard drama={mappedData as any} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upcoming;