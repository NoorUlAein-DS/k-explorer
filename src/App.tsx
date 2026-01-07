import Navbar from "./components/navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Drama from "./pages/Drama";
import Footer  from "./components/Footer";
import Movies from "./pages/Movies";
import Upcoming from "./pages/UpComing";
import Actors from "./pages/Actor";
import Details from "./pages/Details";
import Favorite from "./pages/Favorite";


// import HomeHero from "./components/HomeHero";
function App() {
  return (

    // router pages connectin  
    
    // 'min-h-screen' ensures ke background puri screen cover kare
    <div className="min-h-screen bg-brandLight">
      {/* Humne Navbar component ko yahan call kiya */}
      
      {/* <div> <Home/></div> */}
           {/* <div> <Footer/></div> */}
      {/* <div> <HomeHero/></div> */}
      
      {/* <div className="flex flex-col items-center justify-center mt-20">
         <h2 className="text-brandGreen text-4xl font-bold">Annyeonghaseyo!</h2>
         <p className="mt-4 text-brandDark">Unlock the door to Seoul's secret</p>
      </div> */}
      <Router>
        <Navbar/>
      <Routes>
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/" element={<Home />} />
        <Route path="/dramas" element={<Drama />} />
           <Route path="/movies" element={<Movies />} />
              <Route path="/upcoming" element={<Upcoming/>} />
               <Route path="/favorite" element={<Favorite/>} />
              <Route path="/actors" element={<Actors />} />
      </Routes>

    </Router>
    <Footer />
    </div>
    
  );
}

export default App;