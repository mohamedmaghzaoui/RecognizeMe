// PourquoiPage.jsx
import React from "react";

export const Why = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">Pourquoi Recognize Me ?</h1>
        <p className="lead text-muted">
          Découvrez les raisons pour lesquelles Recognize Me est la solution idéale pour la gestion de présence.
        </p>
      </section>

      {/* Advantages Section */}
      <section className="row g-5 align-items-center">
        <div className="col-md-6">
          <h3 className="text-primary">Automatisation Intelligente</h3>
          <p>
            Grâce à la technologie QR et à notre module IoT en salle de classe, la présence est enregistrée sans intervention humaine.
          </p>
          <h3 className="text-primary">Sécurité et Fiabilité</h3>
          <p>
            Chaque scan est vérifié et horodaté. Impossible de tricher : seul l'étudiant autorisé peut valider sa présence.
          </p>
          <h3 className="text-primary">Simplicité d’utilisation</h3>
          <p>
            Une application intuitive pour les étudiants, un tableau de bord puissant pour les formateurs.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img src="/images/recognize-dashboard.png" alt="Dashboard Recognize Me" className="img-fluid rounded shadow" />
        </div>
      </section>

      {/* Real Use Cases */}
      <section className="mt-5">
        <h3 className="text-center text-info mb-4">Des cas concrets d’utilisation</h3>
        <div className="row">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Écoles et Universités</h5>
                <p className="card-text">
                  Suivi précis des présences, alertes en cas d’absences récurrentes et rapports automatisés pour l’administration.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Formations Professionnelles</h5>
                <p className="card-text">
                  Validation rapide des présences pour les sessions de formation continue et exportation pour les organismes financeurs.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Indépendants</h5>
                <p className="card-text">
                  Gérez facilement vos rendez-vous de coaching, d’enseignement ou de formation à distance avec un suivi fiable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mt-5 my-4">
        <h2>Prêt à simplifier la gestion de présence ?</h2>
        <p>Essayez Recognize Me ou demandez une démo gratuite dès aujourd’hui.</p>
        <button className="btn btn-outline-success">Demander une démo</button>
      </section>
    </div>
  );
};