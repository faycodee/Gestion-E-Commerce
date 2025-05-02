import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// المكونات
import Login from "./components/Login";
// import Login from "./components/components/components/";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Orders from "./components/Orders";
import AllProducts from "./components/AllProducts";
import AddProduct from "./components/AddProduct";
import Customers from "./components/Customers";
import Chats from "./components/Charts";
import EditProduct from "./components/EditProduct";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import AllCategories from "./components/AllCategories";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";
import TvaManagement from "./components/TvaManagement";
import TvaList from "./components/TvaList";
import Ligne_orders from "./components/ligne_Orders";
import AllReduction from "./components/AllReduction";
import AddReduction from "./components/AddReduction";
import EditeReduction from "./components/EditeReduction";
import LivraisonsList from "./components/LivraisonsList";
import AddLivraison from "./components/AddLivraison";
import EditLivraison from "./components/EditLivraison";
import GenerateReport from "./components/Reports/GenerateReport";
import AddCaracteristique from "./components/AddCaracteristique";
import AllCaracteristiques from "./components/AllCaracteristiques";
import EditCaracteristique from "./components/EditCaracteristique";

const App = () => {
  const token = localStorage.getItem("auth_token");
  const isAuthenticated = token && token !== "undefined" && token !== "null";

  return (
    <Router>
      {isAuthenticated && (
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<GenerateReport />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:commande_id" element={<Ligne_orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/categories" element={<AllCategories />} />
              <Route path="/categories/add" element={<AddCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              <Route path="/tvas" element={<TvaList />} />
              <Route path="/tvas/add" element={<TvaManagement />} />

              {/* Routes pour les Réductions */}
              <Route path="/reductions/list" element={<AllReduction/>} />
              <Route path="/reductions/add" element={<AddReduction />} />
              <Route path="/reductions/edit/:id" element={<EditeReduction />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/livraisons" element={<LivraisonsList />} />
              <Route path="/livraisons/add" element={<AddLivraison />} />
              <Route path="/livraisons/edit/:id" element={<EditLivraison />} />
              <Route path="/caracteristiques" element={<AllCaracteristiques />} />
              <Route path="/caracteristiques/add" element={<AddCaracteristique />} />
              <Route path="/caracteristiques/edit/:id" element={<EditCaracteristique/>} />
            </Routes>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
     
        
     
    </Router>
  );
};

export default App;

