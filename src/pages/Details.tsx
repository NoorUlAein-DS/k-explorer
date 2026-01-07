// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Details: React.FC = () => {
//     const { id } = useParams(); // URL se ID pakar li
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const API_KEY = '8049dcc0e794d4c36e976956d1f6826b';

//     const [isFavorite, setIsFavorite] = useState(false);
//     useEffect(() => {
//   const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//   const exists = savedFavorites.some((fav: any) => fav.id === data.id);
//   setIsFavorite(exists);
// }, [data.id]);

// const toggleFavorite = () => {
//   let savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

//   if (isFavorite) {
//     // Agar pehle se hai toh nikaal do (Remove)
//     savedFavorites = savedFavorites.filter((fav: any) => fav.id !== data.id);
//   } else {
//     // Agar nahi hai toh add kar do (Add)
//     savedFavorites.push(data);
//   }

//   localStorage.setItem('favorites', JSON.stringify(savedFavorites));
//   setIsFavorite(!isFavorite); // Heart ka color badal jayega
// };
  
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         // TMDB se specific ID ka data mangwaya
//         const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=videos`);
//         setData(res.data);
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [id]);

//   if (loading) return <div className="bg-brandDark min-h-screen flex items-center justify-center text-brandOrange font-bold text-2xl">Loading Story... 🍿</div>;
//   if (!data) return <div className="text-white text-center pt-40">Drama Not Found!</div>;

//   return (
//     <div className="bg-brandDark min-h-screen text-white">
//       {/* 1. Backdrop Image (Bara Poster) */}
//       <div className="relative h-[70vh] w-full">
//         <img 
//           src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} 
//           className="w-full h-full object-cover opacity-40"
//           alt="backdrop"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent"></div>
        
//         {/* 2. Content Overlay */}
//         <div className="absolute bottom-10 left-0 container mx-auto px-6 flex flex-col md:flex-row gap-10 items-end">
//           <img 
//             src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} 
//             className="w-64 rounded-3xl shadow-2xl border-4 border-white/10 hidden md:block"
//             alt="poster"
//           />
//           <div className="flex-1">
//             <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{data.name}</h1>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="bg-brandOrange px-4 py-1 rounded-full font-bold">★ {data.vote_average.toFixed(1)}</span>
//               <span className="text-gray-300">{data.first_air_date}</span>
//               <span className="border border-brandGreen text-brandGreen px-3 py-1 rounded-md text-sm uppercase">K-Drama</span>
//             </div>
//             <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">{data.overview}</p>
            
//             <button 
//   onClick={toggleFavorite}
//   className="mt-8 flex items-center gap-3 bg-white/10 px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl border border-white/20"
// >
//   {/* 💡 Theme Logic: Orange heart if favorite, else Light Gray */}
//   <span className={`text-3xl ${isFavorite ? 'text-brandOrange' : 'text-gray-400'}`}>
//     {isFavorite ? '❤️' : '🤍'}
//   </span>
//   {isFavorite ? 'ADDED TO FAVORITES' : 'ADD TO FAVORITE'}
// </button>
//           </div>
//         </div>
//       </div>

//       {/* 3. Extra Info Section */}
//       <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
//           <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
//             <h3 className="text-brandOrange font-bold mb-2 uppercase">Status</h3>
//             <p className="text-2xl font-bold">{data.status}</p>
//           </div>
//           <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
//             <h3 className="text-brandOrange font-bold mb-2 uppercase">Episodes</h3>
//             <p className="text-2xl font-bold">{data.number_of_episodes}</p>
//           </div>
//           <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
//             <h3 className="text-brandOrange font-bold mb-2 uppercase">Genres</h3>
//             <p className="text-2xl font-bold">{data.genres.map((g:any) => g.name).join(", ")}</p>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default Details;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Details: React.FC = () => {
  const { id } = useParams(); 
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const API_KEY = '8049dcc0e794d4c36e976956d1f6826b';

  // 1. Fetching Logic (TV aur Movie dono ke liye)
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Pehle TV show try karo
        const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
        setData(res.data);
      } catch (error) {
        try {
          // Agar TV nahi mila toh Movie try karo
          const resMovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
          setData(resMovie.data);
        } catch (movieErr) {
          console.error("Data not found in TV or Movies");
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  // 2. Favorite Check Logic (Memory se check karna)
  useEffect(() => {
    if (data) {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const exists = savedFavorites.some((fav: any) => fav.id === data.id);
      setIsFavorite(exists);
    }
  }, [data]);

  // 3. Toggle Favorite (Add/Remove Logic)
  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
      savedFavorites = savedFavorites.filter((fav: any) => fav.id !== data.id);
    } else {
      // Data ko format karke save karna taake DramaCard mein sahi nazar aaye
      const favoriteItem = {
        id: data.id,
        title: data.name || data.title,
        rating: data.vote_average.toFixed(1),
        genre: data.genres?.map((g: any) => g.name) || ["K-Content"],
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        releaseYear: new Date(data.first_air_date || data.release_date).getFullYear()
      };
      savedFavorites.push(favoriteItem);
    }

    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return (
    <div className="bg-brandDark min-h-screen flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-brandOrange mb-4"></div>
      <p className="text-2xl font-black italic">Loading Story... 🍿</p>
    </div>
  );

  if (!data) return <div className="bg-brandDark min-h-screen text-white text-center pt-40">Drama Not Found!</div>;

  return (
    <div className="bg-brandDark min-h-screen text-white">
      {/* Backdrop Section */}
      <div className="relative h-[70vh] w-full">
        <img 
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} 
          className="w-full h-full object-cover opacity-40"
          alt="backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent"></div>
        
        {/* Main Info Overlay */}
        {/* 2. Content Overlay - Updated for better positioning */}
<div className="absolute inset-0 flex items-end">
  <div className="container mx-auto px-6 pb-12 flex flex-col md:flex-row items-center md:items-end gap-8">
    
    {/* Card/Poster Image */}
    <div className="hidden md:block w-64 flex-shrink-0 transform translate-y-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <img 
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} 
        className="w-full rounded-3xl border-4 border-white/10"
        alt="poster"
      />
    </div>

    {/* Text Info */}
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter leading-none drop-shadow-2xl">
        {data.name || data.title}
      </h1>
      
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-6">
        <span className="bg-brandOrange px-5 py-1.5 rounded-full font-bold text-lg shadow-lg">
          ★ {data.vote_average.toFixed(1)}
        </span>
        <span className="text-white/80 font-medium tracking-wide">
          {new Date(data.first_air_date || data.release_date).getFullYear()}
        </span>
        <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-md text-xs uppercase font-bold">
          K-Explorer Premium
        </span>
      </div>

      <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mb-8 drop-shadow-md line-clamp-3 md:line-clamp-none">
        {data.overview || "Deeply engaging storyline awaits you..."}
      </p>
      
      <button 
        onClick={toggleFavorite}
        className="group flex items-center gap-4 bg-white text-brandDark hover:bg-brandOrange hover:text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl active:scale-95"
      >
        <span className={`text-2xl transition-transform group-hover:scale-125 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
          {isFavorite ? '🧡' : '🤍'}
        </span>
        {isFavorite ? 'WATCHLISTED' : 'ADD TO WATCHLIST'}
      </button>
    </div>
  </div>
</div>
    </div>
    </div>
)
}

export default Details;