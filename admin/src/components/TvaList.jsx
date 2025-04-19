import React, { useEffect, useState } from "react";
import axios from "axios";

const TvaList = () => {
  const [tvas, setTvas] = useState([]);

  useEffect(() => {
    fetchTvas();
  }, []);

  const fetchTvas = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tvas");
      setTvas(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des TVA :", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des TVA</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Nom</th>
              <th className="py-2 px-4">Période</th>
              <th className="py-2 px-4">Taux (%)</th>
            </tr>
          </thead>
          <tbody>
            {tvas.map((tva) => (
              <tr key={tva.id} className="border-b">
                <td className="py-2 px-4">{tva.nom}</td>
                <td className="py-2 px-4">{tva.periode_TVA}</td>
                <td className="py-2 px-4">{tva.taux}</td>
              </tr>
            ))}
            {tvas.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Aucune TVA trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TvaList;