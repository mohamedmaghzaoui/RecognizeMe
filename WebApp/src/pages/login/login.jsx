import { useState } from "react";
import { LoginForm } from "./loginForm";
import { Roles } from "../signUp/roles";
export const Login = ({setIsLogin}) => { //props to show hide login popu
  const [currentForm, setCurrentForm] = useState("roles");
  const [role, setRole] = useState("");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setCurrentForm("signup");
  };
return currentForm === "roles" ? (
    <Roles setRole={handleRoleSelect} />
  ) : (
    <LoginForm setIsLogin={setIsLogin} role={role} />
  );
};
