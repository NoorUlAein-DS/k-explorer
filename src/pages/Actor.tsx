import React, { useState, useEffect } from 'react';

const Actors: React.FC = () => {
  const [actors, setActors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Hardcoded Korean actors data
  const KOREAN_ACTORS_DATA = [
    {
      id: 1,
      name: "Lee Min-ho",
      koreanName: "이민호",
      profile_path: "https://th.bing.com/th/id/OIP.huVfjw5N63S1FEacxH1tRQHaJR?w=184&h=230&c=7&r=0&o=7&pid=1.7&rm=3",
      known_for: "The King: Eternal Monarch, Boys Over Flowers",
      popularity: 85.2
    },
    {
      id: 2, 
      name: "Park Seo-joon",
      koreanName: "박서준",
      profile_path: "https://tse1.mm.bing.net/th/id/OIP.bsbzplLLb6le26e8jQOhtAHaNK?pid=ImgDet&w=188&h=333&c=7&o=7&rm=3",
      known_for: "Itaewon Class, What's Wrong With Secretary Kim",
      popularity: 78.5
    },
    {
      id: 3,
      name: "Song Kang",
      koreanName: "송강",
      profile_path: "data:image/webp;base64,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",
      known_for: "Nevertheless, Sweet Home",
      popularity: 76.8
    },
    {
      id: 4,
      name: "Kim Soo-hyun",
      koreanName: "김수현",
      profile_path: "data:image/webp;base64,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",
      known_for: "It's Okay to Not Be Okay, My Love from the Star",
      popularity: 82.4
    },
    {
      id: 5,
      name: "Hyun Bin",
      koreanName: "현빈",
      profile_path: "https://tse1.mm.bing.net/th/id/OIP.0GVTsidd8RkD6RiiXnL72wHaJ3?pid=ImgDet&w=191&h=254&c=7&o=7&rm=3",
      known_for: "Crash Landing on You, Secret Garden",
      popularity: 80.1
    },
    {
      id: 6,
      name: "Gong Yoo",
      koreanName: "공유",
      profile_path: "data:image/webp;base64,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",
      known_for: "Goblin, Train to Busan",
      popularity: 79.3
    },
    {
      id: 7,
      name: "Park Bo-gum",
      koreanName: "박보검",
      profile_path: "https://i.pinimg.com/originals/b7/9d/a0/b79da043995835e42b247620437bbbd1.jpg",
      known_for: "Love in the Moonlight, Reply 1988",
      popularity: 77.9
    },
    {
      id: 8,
      name: "Cha Eun-woo",
      koreanName: "차은우",
      profile_path: "https://tse3.mm.bing.net/th/id/OIP.VSdNHxqCxg3X4mmgzHRcVQHaJQ?pid=ImgDet&w=191&h=238&c=7&o=7&rm=3",
      known_for: "True Beauty, My ID is Gangnam Beauty",
      popularity: 75.6
    },
    {
      id: 9,
      name: "Jun Ji-hyun",
      koreanName: "전지현",
      profile_path: "https://tse1.explicit.bing.net/th/id/OIP.RypJeGtuVgFtr737dcruBQHaJQ?pid=ImgDet&w=191&h=238&c=7&o=7&rm=3",
      known_for: "My Love from the Star, Legend of the Blue Sea",
      popularity: 81.2
    },
    {
      id: 10,
      name: "Son Ye-jin",
      koreanName: "손예진",
      profile_path: "https://tse1.mm.bing.net/th/id/OIP.2xkPxp3Bs7FcrjgMKOsh1wHaJO?pid=ImgDet&w=191&h=237&c=7&o=7&rm=3",
      known_for: "Crash Landing on You, Something in the Rain",
      popularity: 83.7
    },
    {
  id: 11,
  name: "Rowoon",
  koreanName: "로운",
  profile_path: "https://i.pinimg.com/736x/cf/68/ff/cf68ffab5e8d1c1819b890c86190a9b2.jpg",
  known_for: "Extraordinary You, The King's Affection",
  popularity: 86.4
},
{
  id: 12,
  name: "Kim Se-jeong",
  koreanName: "김세정",
  profile_path: "https://tse3.mm.bing.net/th/id/OIP.vqoLTB5SgMsgsktx_a1WhgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
  known_for: "Business Proposal, The Uncanny Counter",
  popularity: 82.9
},
{
  id: 13,
  name: "Shin Hye-sun",
  koreanName: "신혜선",
  profile_path: "https://tse4.mm.bing.net/th/id/OIP.eeSGpjIgwlXomBI7fTHvnQHaKO?pid=ImgDet&w=191&h=263&c=7&o=7&rm=3",
  known_for: "Mr. Queen, Angel's Last Mission: Love",
  popularity: 85.1
},
{
  id: 14,
  name: "Kim Ji-won",
  koreanName: "김지원",
  profile_path: "https://i.pinimg.com/originals/87/47/67/874767d12bd05552a8e9ed0441ac0310.jpg",
  known_for: "Queen of Tears, Descendants of the Sun",
  popularity: 88.6
},
{
  id: 15,
  name: "Kim Yoo-jung",
  koreanName: "김유정",
profile_path: "https://0.soompi.io/wp-content/uploads/2020/11/23195241/kim-yoo-jung-4.jpg",
  known_for: "My Demon, Love in the Moonlight",
  popularity: 87.3
}
  ];

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setActors(KOREAN_ACTORS_DATA);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="bg-brandDark min-h-screen pt-28 pb-20 text-white">
      <div className="container mx-auto px-6">
        
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 italic">
            Top <span className="text-brandOrange">Korean</span> Stars
          </h1>
          <p className="text-gray-400 text-xl font-medium tracking-widest">Hallyu Wave Icons</p>
          <div className="h-1 w-24 bg-brandOrange mx-auto mt-4 rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-brandOrange mb-4"></div>
            <p className="text-brandOrange text-2xl font-bold animate-pulse">
              Loading K-Stars... 🌸
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {actors.map((person) => (
              <div key={person.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-full aspect-square border-4 border-gray-800 group-hover:border-brandOrange transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,119,35,0.3)]">
                  <img 
                    src={person.profile_path}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback local images agar TMDB wali fail ho
                      e.currentTarget.src = `https://placehold.co/500x500/1a1a1a/ff7733?text=${person.name.charAt(0)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-brandOrange/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-xl font-extrabold group-hover:text-brandOrange transition-colors uppercase tracking-tight">
                    {person.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 font-medium">
                    {person.koreanName}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">
                    ★ {person.popularity.toFixed(1)} Popularity
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Actors;