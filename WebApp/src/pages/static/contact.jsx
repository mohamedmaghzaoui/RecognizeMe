// ContactPage.jsx
import React, { useState } from "react";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending form data
    console.log("Message envoyé:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mt-5">
      <section className="text-center mb-5">
        <h1 className="display-4 text-primary fw-bold">Contactez-Nous</h1>
        <p className="lead text-muted">
          Une question ? Une demande de démo ? Laissez-nous un message et nous vous répondrons rapidement.
        </p>
      </section>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {submitted ? (
            <div className="alert alert-success text-center">
              Merci pour votre message ! Nous vous contacterons bientôt.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          )}
        </div>
      </div>

      <section className="mt-5 text-center">
        <h5>Vous préférez un contact direct ?</h5>
        <p>Email : <a href="mailto:contact@recognizeme.fr">contact@recognizeme.fr</a></p>
        <p>Téléphone : +33 1 23 45 67 89</p>
      </section>
    </div>
  );
};
