import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function Livraison() {
  const [livraisons, setLivraisons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [factures, setFactures] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [ligneCommandes, setLigneCommandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUserLivraisons(user.id);
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facturesRes, commandesRes, ligneCommandesRes] =
          await Promise.all([
            axios.get("http://localhost:8000/api/factures"),
            axios.get("http://localhost:8000/api/commandes"),
            axios.get("http://localhost:8000/api/ligne-commandes"),
          ]);

        setFactures(facturesRes.data);
        setCommandes(commandesRes.data);
        setLigneCommandes(ligneCommandesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchUserLivraisons = async (userId) => {
    try {
      // First get all commandes for the user
      const commandesResponse = await axios.get(
        `http://localhost:8000/api/commandes`
      );
      const userCommandes = commandesResponse.data.filter(
        (commande) => commande.user_id === userId
      );

      // Then get all livraisons
      const livraisonsResponse = await axios.get(
        "http://localhost:8000/api/livraisons"
      );

      // Filter livraisons to only show those associated with user's commandes
      const userLivraisons = livraisonsResponse.data.filter((livraison) =>
        userCommandes.some((commande) => commande.id === livraison.commande_id)
      );

      setLivraisons(userLivraisons);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching livraisons:", error);
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiPackage className="w-6 h-6" />;
      case "shipped":
        return <FiTruck className="w-6 h-6" />;
      case "delivered":
        return <FiCheckCircle className="w-6 h-6" />;
      case "canceled":
        return <FiXCircle className="w-6 h-6" />;
      default:
        return <FiPackage className="w-6 h-6" />;
    }
  };

  const generateFacturePDF = async (livraison) => {
    try {
      const facture = factures.find(
        (f) => f.commande_id === livraison.commande_id
      );
      const commande = commandes.find((c) => c.id === livraison.commande_id);
      const lignes = ligneCommandes.filter(
        (lc) => lc.commande_id === livraison.commande_id
      );

      if (!facture || !commande) {
        console.error("Facture or commande not found");
        return;
      }

      const doc = new jsPDF();

      // Add logo and company info
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text("Weboost", 20, 20);
      doc.text("123 Street Name", 20, 25);
      doc.text("Fes, Maroc", 20, 30);
      doc.text("Phone: +1234567890", 20, 35);
      doc.text("Email: Weboost@company.com", 20, 40);

      // Add facture header with styling
      doc.setFontSize(24);
      doc.setTextColor(66, 139, 202);
      doc.text("FACTURE", 105, 50, { align: "center" });

      // Add divider line
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(20, 55, 190, 55);

      // Billing information in two columns
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);

      // Left column - Facture details
      doc.text("Facture Details:", 20, 70);
      doc.setFontSize(10);
      doc.text(`Facture N°: ${facture.id}`, 20, 80);
      doc.text(
        `Date: ${new Date(facture.date_facturation).toLocaleDateString()}`,
        20,
        85
      );
      doc.text(`Order N°: ${commande.id}`, 20, 90);
      doc.text(`Payment Status: ${facture.payment_status}`, 20, 95);

      // Right column - Shipping details
      doc.setFontSize(11);
      doc.text("Shipping Information:", 110, 70);
      doc.setFontSize(10);
      doc.text(`Carrier: ${livraison.nom_transporteur}`, 110, 80);
      doc.text(`Shipping Cost: ${livraison.frais_expedition} MAD`, 110, 85);
      doc.text(`Estimated Arrival: ${livraison.estime_arrive}`, 110, 90);
      doc.text(`Weight: ${livraison.poid} kg`, 110, 95);

      // Add another divider
      doc.line(20, 105, 190, 105);

      // Prepare table data
      const tableData = lignes.map((ligne) => [
        ligne.produit_id,
        ligne.quantite,
        `${ligne.prix_unitaire} MAD`,
        `${(ligne.prix_unitaire * ligne.quantite).toFixed(2)} MAD`,
      ]);

      let yPosition = 115; // Starting position for the table

      // Enhanced table styling
      autoTable(doc, {
        startY: yPosition,
        head: [["Product", "Quantity", "Unit Price", "Total"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [66, 139, 202],
          fontSize: 11,
          halign: "center",
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 10,
          halign: "center",
        },
        columnStyles: {
          0: { halign: "left" },
          2: { halign: "right" },
          3: { halign: "right" },
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 20 },
        didDrawPage: function (data) {
          yPosition = data.cursor.y + 20;
        },
      });

      // Add totals with better styling
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(250, 250, 250);
      doc.rect(110, yPosition - 5, 80, 35, "F");

      // Add total lines
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Amount HT:", 115, yPosition);
      doc.text(`${facture.montant_HT} MAD`, 180, yPosition, { align: "right" });

      doc.text("TVA:", 115, yPosition + 10);
      doc.text(`${facture.montant_TVA} MAD`, 180, yPosition + 10, {
        align: "right",
      });

      doc.setFontSize(12);
      doc.setTextColor(66, 139, 202);
      doc.text("Total TTC:", 115, yPosition + 25);
      doc.text(`${facture.montant_TTC} MAD`, 180, yPosition + 25, {
        align: "right",
      });

      // Add footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("Thank you for your business!", 105, pageHeight - 20, {
        align: "center",
      });
      doc.text(
        "For any questions, please contact our support team.",
        105,
        pageHeight - 15,
        { align: "center" }
      );

      // Save PDF
      doc.save(`facture_${facture.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background dark:bg-darkBackground">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background dark:bg-darkBackground">
      <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
        <h1
          className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
          style={{ fontFamily: "Impact, Haettenschweiler" }}
        >
          Your Deliveries
          {/* {t("about.1")}.&apos; */}
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {livraisons.map((livraison) => (
          <div
            key={livraison.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(livraison.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      livraison.status
                    )}`}
                  >
                    {livraison.status.charAt(0).toUpperCase() +
                      livraison.status.slice(1)}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  Order #{livraison.commande_id}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Carrier:</span>
                  <span className="font-medium">
                    {livraison.nom_transporteur}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="font-medium">
                    {livraison.frais_expedition} MAD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{livraison.poid} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sent Date:</span>
                  <span className="font-medium">
                    {new Date(livraison.date_envoi).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Arrival:</span>
                  <span className="font-medium">{livraison.estime_arrive}</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  onClick={() => generateFacturePDF(livraison)}
                  href="#"
                  className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Download Facture
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {livraisons.length === 0 && (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Deliveries Found
          </h3>
          <p className="text-gray-500">
            You currently have no deliveries to track.
          </p>
        </div>
      )}
    </div>
  );
}

export default Livraison;
