import React from "react";
import { Calendar } from "../../components/Calendar"; // Assuming this component is for the calendar

export const Home = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-3 text-primary">Bienvenue sur Recognize Me</h1>
        <p className="lead text-muted">
          L'application de gestion de présence des étudiants grâce aux QR codes.
        </p>
        
        <hr className="my-4" />
      </div>

      {/* QR Code Attendance Section */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h3 className="text-center">Présence des Étudiants</h3>
          <p className="text-center">Scannez ou générez un QR code pour marquer la présence.</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success">Générer QR Code</button>
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="text-center">Scanner le QR Code</h3>
          <p className="text-center">Utilisez l'application mobile pour scanner le QR code.</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary">Scanner</button>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mb-5 ">
        <h3 className="text-center">Calendrier des Présences</h3>
        <Calendar />
      </div>

      {/* Mobile App Section */}
      <div className="text-center mb-5">
        <h2 className="text-success">Téléchargez notre application mobile</h2>
        <p className="text-muted">Pour une gestion rapide et facile de la présence.</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-dark me-3">Télécharger sur App Store</button>
          <button className="btn btn-outline-dark">Télécharger sur Google Play</button>
        </div>
      </div>
    </div>
  );
};
