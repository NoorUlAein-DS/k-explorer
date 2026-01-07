import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHero from '../components/HomeHero';
import DramaCard from '../components/DramaCard';
import { useNavigate } from 'react-router-dom';//view button ko drama waley pa ley janey ka liyan 

// 1. "Component ke bahar" ka matlab yahan hai (Mapping)
const genreMap: { [key: string]: number } = {
  "Action": 10759,
  "Romance": 10749,
  "Fantasy": 10765,
  "Comedy": 35,
  "Drama": 18
};

const API_KEY = '8049dcc0e794d4c36e976956d1f6826b'; // <--- Apni Key Yahan Dalein

const Home: React.FC = () => {

  const navigate = useNavigate(); // 1. Taxi Driver ko bulaya

  const handleViewAll = () => {
    navigate('/dramas'); // 2. Driver ko bola ke '/dramas' le chalo
  };
  const [apiDramas, setApiDramas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentIndex, setCurrentIndex] = useState(0);

  const lines = [
    "Romance: Love stories to warm your soul",
    "Comedy: For your daily dose of laughter",
    "Thriller: Edge-of-your-seat suspense",
    "Drama: Stories that touch your heart",
    "Action: Heart-pumping excitement"
  ];

  // --- API Fetching Logic (Main Function) ---
  const fetchContent = async (genreName: string) => {
    setLoading(true);
    try {
      let url = "";
      if (genreName === "All") {
        // Default trending Korean dramas
        url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`;
      } else {
        // Filtered Korean dramas by Genre ID
        const genreId = genreMap[genreName];
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&with_original_language=ko&sort_by=popularity.desc`;
      }
      
      const response = await axios.get(url);
      setApiDramas(response.data.results);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchContent("All");
  }, []);

  // Handle Genre Change
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    fetchContent(genre);
  };

  // Lines animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % lines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- Filtering & Mapping ---
  const displayedData = apiDramas
    .map((item) => ({
      id: item.id,
      title: item.name || item.title,
      rating: item.vote_average?.toFixed(1) || "0.0",
      genre: [selectedGenre === "All" ? "K-Drama" : selectedGenre],
      poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      releaseYear: new Date(item.first_air_date || item.release_date).getFullYear() || 0,
    }))
    .filter((drama) => drama.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "highest-rated") return Number(b.rating) - Number(a.rating);
      if (sortBy === "newest") return b.releaseYear - a.releaseYear;
      return 0;
    });

  return (
    <div className="bg-brandLight min-h-screen pb-20">
      <HomeHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto px-6 py-16">
        {/* Trending Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-bold text-brandDark uppercase tracking-widest">
              {selectedGenre} <span className="text-brandGreen">Dramas</span>
            </h3>
            <div className="h-1 w-20 bg-brandOrange mt-2"></div>
          </div>
          
          <button onClick={handleViewAll} className="text-brandGreen font-bold hover:underline">View All →</button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {loading ? (
            <div className="col-span-full text-center py-20 text-brandOrange font-bold animate-pulse">
              Loading {selectedGenre} Vibes... 🍿
            </div>
          ) : displayedData.length > 0 ? (
            displayedData.slice(0, 10).map((drama) => (
              <DramaCard key={drama.id} drama={drama as any} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-brandDark opacity-50">
              No dramas found in this vibe. Try another!
            </div>
          )}
        </div>

        {/* Pick Your Vibe Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-brandOrange bg-brandDark p-6 inline-block rounded-xl shadow-2xl">
            Pick <span className="text-white">Your</span> Vibe
          </h2>
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-brandOrange animate-ping" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-3xl shadow-xl border border-brandGreen/10">
          <select 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-brandDark text-white p-3 rounded-xl font-bold outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="highest-rated">Highest Rated</option>
          </select>

          <p className="text-brandGreen font-extrabold text-xl animate-pulse text-center">
            {lines[currentIndex]}
          </p>

          <div className="flex gap-2 flex-wrap justify-center">
            {["All", "Romance", "Action", "Fantasy", "Drama"].map((g) => (
              <button 
                key={g}
                onClick={() => handleGenreChange(g)}
                className={`px-5 py-2 rounded-full font-bold transition-all ${
                  selectedGenre === g ? 'bg-brandOrange text-white scale-110 shadow-lg' : 'bg-brandLight text-brandDark border border-gray-200 hover:border-brandOrange'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;