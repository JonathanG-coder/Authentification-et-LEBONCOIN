import React, { useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/auth.validation";



const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    setServerError("");

    try {
      // Création du FormData pour inclure l'avatar
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.avatar?.[0]) formData.append("avatar", data.avatar[0]);

      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setServerError(error.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <Form
        inputs={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Mot de passe", type: "password" },
          { name: "confirmPassword", label: "Confirmer mot de passe", type: "password" },
          { name: "avatar", label: "Avatar", type: "file" },
        ]}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        submitLabel={loading ? "Envoi..." : "S'inscrire"}
      />
    </div>
  );
};

export default Register;
