import React from "react";


export const Roles = ({ setRole }) => {
  const handleRoleSelect = (role) => {
    setRole(role); // send selected role to parent
  };

  return (
    <div className="overlay">
      <div className="content col-4 text-center p-4 bg-white rounded shadow">
        <h2 className="mb-4">Choisissez votre rôle</h2>
        <button
          className="btn btn-primary w-100 mb-2"
          onClick={() => handleRoleSelect("admin")}
        >
            👨‍💼 Admin
        </button>
        <button
          className="btn btn-success w-100 mb-2"
          onClick={() => handleRoleSelect("student")}
        >
          🎓 Étudiant
        </button>
        <button
          className="btn btn-warning w-100"
          onClick={() => handleRoleSelect("teacher")}
        >
          👩‍🏫 Prof
        </button>
      </div>
    </div>
  );
};
