import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Navbar, About } from "./components";
import DarkLightToggle from "./components/darkLight";
import MarqueeComponent from "./components/Marquee";
import CustomCursor from "./components/cursor";
import HighlightsWelcome from "./components/highlightsWelcome";
import Highlights from "./components/highlights";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import SingleProduct from "./components/SingleProduct";
import Categories from "./components/Categories";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";

const App = () => (
  <BrowserRouter>
    <CustomCursor />
    <DarkLightToggle />
    <div className="bg-background dark:bg-darkBackground">
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
            </>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
