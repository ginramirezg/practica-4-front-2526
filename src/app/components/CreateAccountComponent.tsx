"use client";

import { useState } from "react";
import { registerUser } from "../lib/utils";
import { useRouter } from "next/navigation";

export const CreateAccountComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      const data = await registerUser(username, email, password);

      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `userId=${data.user._id}; path=/`;
      document.cookie = `username=${data.user.username}; path=/`;

      router.push("/");
      router.refresh();
    } catch {
      setError("Error al crear cuenta");
    }
  };

  return (
    <div className="AuthForm">
      <label>Username</label>
      
      <input placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Email</label>
      <input placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Contraseña</label>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Crear cuenta</button>

      {error && <p className="Error">{error}</p>}
    </div>
  );
};