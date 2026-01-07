import React from 'react';
import type{ KDrama } from '../types';
import { useNavigate } from 'react-router-dom';
interface Props {
  drama: KDrama;
}

// const DramaCard: React.FC<Props> = ({ drama }) => {
//    const navigate = useNavigate();

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-b-4 border-brandOrange group cursor-pointer hover:-translate-y-2 transition-all duration-300">
//       {/* Poster Image */}
//       <div className="relative h-72 overflow-hidden">
       
// <div onClick={() => navigate(`/detail/${drama.id}`)} className="cursor-pointer">
//    {/* Card ka design */}
// </div>
//         <img 
//           src={drama.poster} 
//           alt={drama.title} 
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//         />
//         <div className="absolute top-2 right-2 bg-brandDark/80 text-brandOrange px-2 py-1 rounded-md text-sm font-bold">
//           ⭐ {drama.rating}
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="p-4">
//         <h4 className="text-brandDark font-bold truncate text-lg group-hover:text-brandOrange transition-colors">
//           {drama.title}
//         </h4>
//         <div className="flex justify-between items-center mt-2">
//           <span className="text-xs text-brandGreen font-semibold uppercase tracking-tighter">
//             {drama.genre[0]}
//           </span>
//           <span className="text-xs text-gray-400">{drama.releaseYear}</span>
//         </div>
//       </div>
//     </div>
//   );
// };
const DramaCard: React.FC<Props> = ({ drama }) => {
  const navigate = useNavigate();

  return (
    /* 💡 Logic: onClick poore main div par laga diya taake card kahin se bhi click ho, detail page khule */
    <div 
      onClick={() => navigate(`/detail/${drama.id}`)} 
      className="bg-white rounded-2xl overflow-hidden shadow-lg border-b-4 border-brandOrange group cursor-pointer hover:-translate-y-2 transition-all duration-300"
    >
      {/* Poster Image */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={drama.poster} 
          alt={drama.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-brandDark/80 text-brandOrange px-2 py-1 rounded-md text-sm font-bold">
          ⭐ {drama.rating}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h4 className="text-brandDark font-bold truncate text-lg group-hover:text-brandOrange transition-colors">
          {drama.title}
        </h4>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-brandGreen font-semibold uppercase tracking-tighter">
            {drama.genre[0]}
          </span>
          <span className="text-xs text-gray-400">{drama.releaseYear}</span>
        </div>
      </div>
    </div>
  );
};
export default DramaCard;