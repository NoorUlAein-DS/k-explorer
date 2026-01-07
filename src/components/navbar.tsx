import React, { useState } from 'react'; // React aur useState ko ek saath import karein
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false); 
  const [fanName, setFanName] = useState("");

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dramas', path: '/dramas' },
    { name: 'Movies', path: '/movies' },
    { name: 'Upcoming', path: '/upcoming' },
    { name: 'Actors', path: '/actors' },
    { name: 'Favorites', path: '/favorite' },
  ];

  return (
    <>
      <nav className="fixed w-full z-[50] bg-brandDark p-5 shadow-xl border-b border-brandGreen/30">
        <div className="container mx-auto flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/">
            <h1 className="text-brandOrange text-3xl font-black tracking-tighter cursor-pointer">
              K-EXPLORER <span className="text-white text-sm font-normal">| <sub className='text-1xl font-bold mx-2'> A E I N</sub></span>
            </h1>
          </Link>
          
          {/* Links Section */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className="text-sm font-bold text-gray-300 hover:text-brandOrange transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Button */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-brandOrange text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-80 transition"
          >
            Join Fan Club
          </button>
        </div>
      </nav>

      {/* Modal Logic */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-brandDark/80 backdrop-blur-md" 
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white p-10 rounded-[40px] shadow-2xl max-w-sm w-full mx-4 text-center border-4 border-brandOrange/20">
            {!isJoined ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black text-brandDark mb-2">Join Club</h2>
                <p className="text-gray-500 mb-6 ">Enter your name, K-Fan!</p>
                <input 
                  type="text" 
                  value={fanName}
                  className="w-full p-4 bg-gray-100 rounded-2xl mb-4 text-black outline-none focus:ring-2 ring-brandOrange transition-all"
                  placeholder="Your name here..."
                  onChange={(e) => setFanName(e.target.value)}
                />
                <button 
                  onClick={() => setIsJoined(true)} 
                  className="w-full bg-brandDark text-white py-4 rounded-2xl font-black hover:bg-brandOrange transition-all shadow-lg"
                >
                  BECOME A MEMBER
                </button>
              </div>
            ) : (
              <div className="animate-in zoom-in duration-500">
                <h2 className="text-3xl font-black text-brandOrange mb-2">Gamsahabnida</h2>
                <p className="text-xl text-brandDark font-bold mb-1">Annyeong, {fanName}-ssi!</p>
                <p className="text-gray-500 mb-8 text-sm">You're now part of the K-Explorer family.</p>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsJoined(false);
                    setFanName("");
                  }}
                  className="w-full bg-brandGreen text-white py-4 rounded-2xl font-black shadow-lg"
                >
                  START EXPLORING
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;