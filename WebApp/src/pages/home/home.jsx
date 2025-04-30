// HomePage.jsx
import React from "react";

export const Home = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-3 text-primary fw-bold">Bienvenue sur Recognize Me</h1>
        <p className="lead text-muted">
          L'application intelligente de gestion de présence basée sur la reconnaissance faciale.
        </p>
        <hr className="my-4" />
      </section>

      {/* Présence par caméra */}
      <section className="row align-items-center mb-5">
        <div className="col-md-6 text-center">
          <h3 className="mb-3 text-secondary">Reconnaissance Faciale</h3>
          <p>Les étudiants sont identifiés automatiquement grâce à la caméra et un modèle d’analyse d'image.</p>
          <button className="btn btn-success">Activer la caméra</button>
        </div>
        <div className="col-md-6 text-center">
          <h3 className="mb-3 text-secondary">Suivi Automatisé</h3>
          <p>Plus besoin de scanner quoi que ce soit : la détection est instantanée dès l’entrée en classe.</p>
          <button className="btn btn-primary">Voir les présences</button>
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
        <p className="text-muted">Gérez les présences et visualisez les statistiques en temps réel.</p>
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
          <p>Détection rapide de la présence grâce à l’intelligence artificielle.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-gear-wide-connected display-4 text-warning"></i>
          <h5 className="mt-3">Sans contact</h5>
          <p>Un système fluide, hygiénique et sans intervention manuelle.</p>
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
