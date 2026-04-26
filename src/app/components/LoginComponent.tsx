"use client";

import { useState } from "react";
import { loginUser } from "../lib/utils";

export const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const data = await loginUser(email, password);

      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `userId=${data.user._id}; path=/`;
      document.cookie = `username=${data.user.username}; path=/`;

      window.location.href = "/";
    } catch {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="AuthForm">
      <label>Email</label>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Contraseña</label>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Entrar</button>

      {error && <p className="Error">{error}</p>}
    </div>
  );
};