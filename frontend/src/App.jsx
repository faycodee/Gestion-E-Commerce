import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import './i18n';
import "./App.css";
import { Home, Navbar, About } from "./components";
import DarkLightToggle from "./components/darkLight";
import MarqueeComponent from "./components/Marquee";
import CustomCursor from "./components/cursor";
import HighlightsWelcome from "./components/highlightsWelcome";
import Highlights from "./components/highlights";
import Footer from "./components/Footer";
// import Login from "./admin/Login";
// import Dashboard from "./admin/dashboard";
// import Edit from "./admin/Edit";
// import Add from "./admin/Add";
// import Manag from "./admin/Manag";


const App = () => (
  <BrowserRouter>
    <CustomCursor />
    <DarkLightToggle />
    <div className="bg-background dark:bg-darkBackground ">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>   
              <Home />
              <MarqueeComponent r={"-2deg"} />
              <About />
              <HighlightsWelcome />
              <Highlights />
  
             
             </> } />
        <Route path="/about" element={<About />} />
       
        <Route path="/footer" element={<Footer />} />
        
      
       
        {/* <Route path="/login" element={<Login />} />
        <Route path="login/dashboard" element={<Dashboard />} />
        <Route path="login/dashboard/add" element={<Add />} />
        <Route path="login/dashboard/manag" element={<Manag />} />
        <Route path="login/dashboard/manag/edit/:id" element={<Edit />}  /> */}
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
