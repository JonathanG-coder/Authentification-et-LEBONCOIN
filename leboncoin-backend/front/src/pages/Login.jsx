import React, { useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/UseAuth";
import { loginUser, getMe } from "../services/auth.service"; // ajouter getMe
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/auth.validation";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    setServerError("");

    try {
      //  Login : le backend met le token dans HttpOnly cookie
      await loginUser(data);

      // Récupération des infos utilisateur via cookie
      const meRes = await getMe();
      setUser(meRes.data.user);

      // Redirection après login
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setServerError(error.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <Form
        inputs={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Mot de passe", type: "password" },
        ]}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        submitLabel={loading ? "Connexion..." : "Se connecter"}
      />
    </div>
  );
};

export default Login;
