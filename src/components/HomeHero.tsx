import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DramaCard from '../components/DramaCard';
import type { KDrama } from '../types';

const HomeHero: React.FC = () => {
  const [dramas, setDramas] = useState<KDrama[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = '8049dcc0e794d4c36e976956d1f6826b';

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`);
      const formatted = res.data.results.map((item: any) => ({
        id: item.id,
        title: item.name || item.title,
        poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        rating: item.vote_average.toFixed(1),
        genre: ["K-Drama"],
        releaseYear: (item.first_air_date || "").split("-")[0]
      }));
      setDramas(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return fetchTrending();
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}`
      );
      const searchResults = res.data.results
        .filter((item: any) => item.poster_path)
        .map((item: any) => ({
          id: item.id,
          title: item.name || item.title,
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          rating: item.vote_average?.toFixed(1) || "0.0",
          genre: ["Result"],
          releaseYear: (item.first_air_date || item.release_date || "").split("-")[0]
        }));
      setDramas(searchResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brandLight min-h-screen">
      <div className="w-full bg-white h-[100px]"></div>
      {/* --- HERO SECTION (DARK THEME) --- */}
   <div className="w-full bg-white h-[50px]"></div>
      <section className="bg-brandDark pt-32 pb-20 px-6 text-center">
        <div className="container mx-auto">
          {/* <h2 className="text-brandOrange font-bold tracking-[0.3em] uppercase mb-4">Discover Korea</h2> */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Annyeonghaseyo <span className="text-brandOrange underline decoration-brandGreen">K-Fan!</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Explore the world of premium K-Dramas, Movies, and your favorite Actors all in one place.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex bg-white rounded-full overflow-hidden p-1 shadow-2xl mb-10">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search dramas, movies, or stars..." 
              className="w-full px-6 py-3 outline-none text-brandDark"
            />
            <button 
              onClick={handleSearch}
              className="bg-brandOrange text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition"
            >
              Search
            </button>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dramas" className="px-8 py-3 bg-transparent border-2 border-brandOrange text-white font-bold rounded-xl hover:bg-brandOrange transition-all">
              DRAMAS
            </Link>
            <Link to="/movies" className="px-8 py-3 bg-transparent border-2 border-brandOrange text-white font-bold rounded-xl hover:bg-brandOrange transition-all">
              MOVIES
            </Link>
            <Link to="/actors" className="px-8 py-3 bg-transparent border-2 border-brandOrange text-white font-bold rounded-xl hover:bg-brandOrange transition-all">
              ACTORS
            </Link>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-brandDark mb-8 uppercase border-l-8 border-brandOrange pl-4">
          {searchTerm ? `Results for: ${searchTerm}` : " Trending Now"}
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-brandOrange border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 font-bold text-brandOrange">Searching the Archives... 🍿</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {dramas.map((drama) => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHero;