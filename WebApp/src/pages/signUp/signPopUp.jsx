import "./../login/login.css";
import { SignForm } from "./signForm";
import { Roles } from "./roles";
// import { useState } from "react";
export const SignUpPopUp = ({ setIsSignUp }) => {
  // const [currentForm, setCurrentForm] = useState("roles");
  // const [role, setRole] = useState("");

  // const handleRoleSelect = (selectedRole) => {
  //   setRole(selectedRole);
  //   setCurrentForm("signup");
  // };

return <SignForm setIsSignUp={setIsSignUp}/>}
