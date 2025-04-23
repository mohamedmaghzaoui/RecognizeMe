// TarifPage.jsx
import React from "react";

export const Tarif = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Nos Tarifs</h1>
        <p className="lead text-muted">Choisissez l’offre qui correspond à votre structure.</p>
      </section>

      {/* Pricing Plans */}
      <section className="row text-center g-4">
        {/* Professionnel */}
        <div className="col-md-4">
          <div className="card border-primary h-100">
            <div className="card-header bg-primary text-white">
              <h4 className="my-0">Professionnel</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">49€<small className="text-muted">/mois</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Jusqu’à 100 utilisateurs</li>
                <li>Support prioritaire</li>
                <li>Accès au tableau de bord complet</li>
                <li>Exportation des rapports</li>
              </ul>
              <button className="btn btn-primary">Choisir</button>
            </div>
          </div>
        </div>

        {/* Organisme */}
        <div className="col-md-4">
          <div className="card border-success h-100">
            <div className="card-header bg-success text-white">
              <h4 className="my-0">Organisme</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">99€<small className="text-muted">/mois</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Utilisateurs illimités</li>
                <li>Assistance personnalisée</li>
                <li>Formation incluse</li>
                <li>Intégration API complète</li>
              </ul>
              <button className="btn btn-success">Choisir</button>
            </div>
          </div>
        </div>

        {/* Indépendant */}
        <div className="col-md-4">
          <div className="card border-secondary h-100">
            <div className="card-header bg-secondary text-white">
              <h4 className="my-0">Indépendant</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">19€<small className="text-muted">/mois</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Jusqu’à 20 utilisateurs</li>
                <li>Support par email</li>
                <li>Accès à l’essentiel</li>
                <li>Rapports mensuels</li>
              </ul>
              <button className="btn btn-secondary">Choisir</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mt-5">
        <h2>Besoin d’un plan personnalisé ?</h2>
        <p>Contactez notre équipe pour un devis adapté à vos besoins spécifiques.</p>
        <button className="btn btn-outline-primary">Nous contacter</button>
      </section>
    </div>
  );
};
