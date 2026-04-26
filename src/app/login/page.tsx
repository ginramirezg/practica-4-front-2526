"use client";

import { useState } from "react";
import { LoginComponent } from "@/../src/app/components/LoginComponent";
import { CreateAccountComponent } from "@/../src/app/components/CreateAccountComponent";
export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <main className="LoginPage">
      <section className="LoginBrand">
        <div className="BigLogo">N</div>
        <h1>Nebrija<span>Social</span></h1>
      </section>

      <section className="AuthCard">
        <div className="AuthTabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Iniciar sesión
          </button>

          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Crear cuenta
          </button>
        </div>

        {mode === "login" && <LoginComponent />}
        {mode === "register" && <CreateAccountComponent />}
      </section>
    </main>
  );
}