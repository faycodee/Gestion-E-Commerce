import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const GenerateReport = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [factures, setFactures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const itemsPerPage = 15; // Nombre d'éléments par page

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/api/commandes"),
      axios.get("http://localhost:8000/api/factures"),
      axios.get("http://localhost:8000/api/users")
    ])
      .then(([ordersResponse, facturesResponse, usersResponse]) => {
        setOrders(ordersResponse.data);
        setUsers(usersResponse.data);
        setFactures(facturesResponse.data);
      })
      .catch((error) => console.error("Erreur lors du fetch des données:", error));
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Order Report", 20, 10);
      const tableColumn = ["Order ID", "Customer", "Payment Status", "Delivery Status"];
      const tableRows = orders.map((order) => [
        order.id || "N/A",
        users.find((user) => user.id === order.user_id)?.first_name || "Non renseigné",
        factures.find((facture) => facture.commande_id === order.id)?.payment_status || "Non renseigné",
        order.statut || "Non renseigné",
      ]);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 66, 66] }
      });
      doc.save("orders.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Generate Report</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Order ID</th>
              <th className="border-b p-2">Customer</th>
              <th className="border-b p-2">Payment Status</th>
              <th className="border-b p-2">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr key={order.id}>
                <td className="border-b p-2">{order.id}</td>
                <td className="border-b p-2">
                  {users.find((user) => user.id === order.user_id)?.first_name || "Non renseigné"}
                </td>
                <td className="border-b p-2">
                  {factures.find((facture) => facture.commande_id === order.id)?.payment_status || "Non renseigné"}
                </td>
                <td className="border-b p-2">{order.statut || "Non renseigné"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          ⬅️ Précédent
        </button>
        <span className="text-gray-600">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Suivant ➡️
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        <CSVLink
          data={orders}
          filename="orders.csv"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export CSV
        </CSVLink>
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
        <button
          onClick={exportToPDF}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default GenerateReport;