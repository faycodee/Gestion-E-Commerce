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
import Login from "./components/Login";
import Signup from "./components/Signup";

// Import ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";
import Categories from "./components/Categories";
import Faq from "./components/FAQ";
import Favourites from "./components/Favourites";
import Panier from "./components/Panier";

import Livraison from "./components/Livraison";
import EditProfil from "./components/EditProfil";

import Fidélité from "./components/Fidélité";


const App = () => (
  <BrowserRouter>
    <CustomCursor />
    <DarkLightToggle />
    <div className="bg-background dark:bg-darkBackground">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <MarqueeComponent r={"-2deg"} />
              <About />
              <HighlightsWelcome />
              <Highlights />
              <Footer />
            </>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/livraison" element={<Livraison />} />

        <Route path="/Points" element={<Fidélité />} />


        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfil />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
