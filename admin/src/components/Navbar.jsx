import React, { useState, useEffect } from "react";
import {
  RiNotification3Line,
  RiUser3Line,
} from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios pour les requêtes API

const Navbar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [commentCount, setCommentCount] = useState(0); // Nombre de commentaires
  const [comments, setComments] = useState([]); // Liste des commentaires
  const [showComments, setShowComments] = useState(false); // État pour afficher/masquer les commentaires
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les données utilisateur depuis localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Récupérer les commentaires des commandes
    fetchCommentCount();
  }, []);

  const fetchCommentCount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/commandes");
      const commandes = response.data;

      // Filtrer les commandes avec des commentaires non vides
      const filteredComments = commandes.filter(
        (commande) => commande.commentaire && commande.commentaire.trim() !== ""
      );
      setCommentCount(filteredComments.length); // Mettre à jour le nombre de commentaires
      setComments(filteredComments); // Stocker les commentaires
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter?");
    if (confirmLogout) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      alert("✅ Vous avez été déconnecté !");
      window.location.href = "/login";
    }
  };

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-4 shadow-md relative">
      {/* Right: Icons */}
      <div className="flex items-center gap-4 relative ml-auto">
        {/* Notifications */}
        <div className="relative">
          <RiNotification3Line
            className="text-purple-600 text-xl cursor-pointer"
            onClick={() => setShowNotif(!showNotif)} // Toggle affichage des notifications
            onDoubleClick={() => setShowComments(false)} // Double-clic pour masquer tous les commentaires
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-4 space-y-2 z-20">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowComments(!showComments)} // Toggle affichage des commentaires
              >
                <span className="text-gray-800">Commentaire</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">{commentCount}</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <RiUser3Line
            className="text-gray-500 text-xl cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg p-3 space-y-2 z-20">
              <div className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <AiOutlineUser />
                <span>{user ? user.first_name : "Profile"}</span>
              </div>
              
              <div
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded cursor-pointer"
                onClick={handleLogout}
              >
                <FiLogOut />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Liste des commentaires */}
      {showComments && (
        <div className="absolute top-16 right-4 w-96 bg-white rounded-xl shadow-lg p-4 z-30">
          <h3 className="text-lg font-bold mb-2">Commentaires</h3>
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="border-b pb-2">
                <p className="text-gray-800 text-sm">{comment.commentaire}</p>
                <p className="text-gray-500 text-xs">Commande ID: {comment.id}</p>
              </li>
            ))}
          </ul>
          {comments.length === 0 && (
            <p className="text-gray-500 text-sm">Aucun commentaire disponible.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;