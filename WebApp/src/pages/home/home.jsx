// HomePage.jsx
import React from "react";


export const Home = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-3 text-primary fw-bold">Bienvenue sur Recognize Me</h1>
        <p className="lead text-muted">
          L'application de gestion de présence des étudiants grâce aux QR codes et à la technologie IoT.
        </p>
        <hr className="my-4" />
      </section>

      {/* Présence QR Code Section */}
      <section className="row align-items-center mb-5">
        <div className="col-md-6 text-center">
          <h3 className="mb-3 text-secondary">Présence des Étudiants</h3>
          <p>Scannez ou générez un QR code pour enregistrer votre présence.</p>
          <button className="btn btn-success">Générer QR Code</button>
        </div>
        <div className="col-md-6 text-center">
          <h3 className="mb-3 text-secondary">Scanner le QR Code</h3>
          <p>Utilisez notre application mobile pour scanner votre QR code personnalisé.</p>
          <button className="btn btn-primary">Scanner</button>
        </div>
      </section>

      {/* Calendar Integration */}
      <section className="mb-5">
        <h3 className="text-center text-info">Calendrier des Sessions</h3>
        <p className="text-center text-muted">Visualisez vos cours et vos sessions programmées.</p>
        
      </section>

      {/* Mobile App Promotion */}
      <section className="text-center mb-5">
        <h2 className="text-success">Téléchargez notre application mobile</h2>
        <p className="text-muted">Pour une gestion rapide et simplifiée de la présence.</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-dark me-3">App Store</button>
          <button className="btn btn-outline-dark">Google Play</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="row text-center py-5 bg-light rounded">
        <div className="col-md-4">
          <i className="bi bi-shield-check display-4 text-primary"></i>
          <h5 className="mt-3">Sécurisé</h5>
          <p>Vos données sont protégées avec les dernières technologies de chiffrement.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-clock-history display-4 text-success"></i>
          <h5 className="mt-3">En temps réel</h5>
          <p>Suivi immédiat des présences et des retards grâce à la connectivité IoT.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-gear-wide-connected display-4 text-warning"></i>
          <h5 className="mt-3">Intégration facile</h5>
          <p>S’intègre rapidement avec vos outils pédagogiques et bases de données existantes.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center my-5">
        <h2>Prêt à moderniser votre système de présence ?</h2>
        <p>Créez un compte ou contactez-nous pour une démonstration personnalisée.</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary me-3">Créer un compte</button>
          <button className="btn btn-outline-secondary">Nous contacter</button>
        </div>
      </section>
    </div>
  );
};