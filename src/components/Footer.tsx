import React from 'react';
import { Instagram, Github, Linkedin, Mail } from 'lucide-react';
// Agar aapne icons install kiye hain (like lucide-react) toh wo use kar sakte hain
// Warna hum text links use karenge

const Footer: React.FC = () => {
  return (
    <footer className="bg-brandDark text-white py-12 mt-20 border-t border-brandGreen/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Slogan */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-brandOrange tracking-tighter">K-EXPLORER</h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Your ultimate destination for Korean entertainment.
            </p>
          </div>

          {/* Social Accounts Section */}
          <div className="flex flex-col items-center">
            <h4 className="text-brandGreen font-bold mb-4 uppercase text-xs tracking-widest">Follow the Journey</h4>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/noorulaein477/" target="_blank" rel="noreferrer" 
     className="p-3 bg-white/5 rounded-full hover:text-brandOrange hover:bg-brandOrange/10 transition-all transform hover:-translate-y-2 border border-white/10">
    <Instagram size={20} />
  </a>

  <a href="https://github.com/NoorUlAein-DS" target="_blank" rel="noreferrer"
     className="p-3 bg-white/5 rounded-full hover:text-brandOrange hover:bg-brandOrange/10 transition-all transform hover:-translate-y-2 border border-white/10">
    <Github size={20} />
  </a>

  <a href="https://www.linkedin.com/in/noor-ul-aein-salamat-khan-7105323a2/" target="_blank" rel="noreferrer"
     className="p-3 bg-white/5 rounded-full hover:text-brandOrange hover:bg-brandOrange/10 transition-all transform hover:-translate-y-2 border border-white/10">
    <Linkedin size={20} />
  </a>

  <a href="href=mailto:noorulaeinsalamatkhan@gmail.com" 
     className="p-3 bg-white/5 rounded-full hover:text-brandOrange hover:bg-brandOrange/10 transition-all transform hover:-translate-y-2 border border-white/10">
    <Mail size={20} />
  </a>
               </div>
          </div>

          {/* Newsletter / Copyright */}
          <div className="text-center md:text-right">
            <span className="text-gray-500">© 2026</span>
  <span className="text-brandOrange font-bold mx-2">K-Explorer <span className='text-white'>| ᴀᴇɪɴ</span></span>
            <p className="text-gray-500 text-xs mt-1"> Built by Noor ul Aein | Data Science Student</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;