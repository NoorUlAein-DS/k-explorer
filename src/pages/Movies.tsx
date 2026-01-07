import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DramaCard from '../components/DramaCard'; // Card hum wahi purana use karenge

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '8049dcc0e794d4c36e976956d1f6826b'; 
  // 💡 Logic Change: Yahan 'tv' ki jagah 'movie' likha hai
  const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="bg-brandLight min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-12 border-l-8 border-brandGreen pl-6">
          <h1 className="text-5xl font-black text-brandDark uppercase tracking-tighter">
            Korean <span className="text-brandGreen">Movies</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Cinema at its best - From Thrillers to Rom-coms</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brandGreen"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {movies.map((item) => {
              // 💡 Mapping Logic: Movies mein 'name' ki jagah 'title' use hota hai
              const mappedData = {
                id: item.id,
                title: item.title, 
                rating: item.vote_average.toFixed(1),
                genre: ["Movie"],
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                releaseYear: new Date(item.release_date).getFullYear(),
              };

              return <DramaCard key={mappedData.id} drama={mappedData as any} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;