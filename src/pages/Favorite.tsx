import React, { useState, useEffect } from 'react';
import DramaCard from '../components/DramaCard';

const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // 💡 Logic: Computer ki memory (LocalStorage) se data nikalo
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(saved);
  }, []);

  return (
    <div className="bg-brandLight min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="mb-12 border-l-8 border-brandOrange pl-6">
          <h1 className="text-5xl font-black text-brandDark uppercase">
            My <span className="text-brandOrange">Watchlist</span> ❤️
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Your personal collection of K-Dramas and Movies.</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200">
             <p className="text-gray-400 text-xl font-bold">Your watchlist is empty. Go add some dramas! 🍿</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {favorites.map((drama) => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;