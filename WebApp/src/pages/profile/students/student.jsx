import { Link } from "react-router-dom";
import { useUser } from "../../../context/context";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";

export const Student = () => {
  const { user } = useUser();

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Profil Étudiant */}
        <div className="col-md-6 mx-auto">
          <div className="card shadow p-4 rounded-3">
            <h3 className="text-primary mb-3">🎓 Profil Étudiant</h3>
            <p><strong>Nom complet :</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Rôle :</strong> {user.role}</p>
            <p><strong>École :</strong> {user.school_name}</p>
            <p><strong>Adresse de l'école :</strong> {user.school_address}</p>
            <p><strong>Classe :</strong> {user.classroom_name ?? "Non assignée"}</p>

            <div className="mt-4 d-flex gap-3">
              <Link to={"/calendar"} className="btn btn-outline-primary">
                <FaCalendarAlt className="me-2" />
                Voir le calendrier
              </Link>
              <button className="btn btn-outline-success">
                <FaEdit className="me-2" />
                Modifier
              </button>
              <button className="btn btn-outline-danger">
                <FaTrash className="me-2" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
