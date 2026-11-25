"use client";

import { useActionState } from "react";
import { simpanMasuk, type LoginState } from "@/app/login/action";
import { Navbar } from "./navbar";

const initialState: LoginState = {};

export function LoginPage() {
  const [state, formAction, pending] = useActionState(simpanMasuk, initialState);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="login-main">
        <form className="login-card" action={formAction}>
          <p className="section-label">PustakaKu</p>
          <h1>Masuk</h1>
          <p className="login-description">Masuk untuk mengelola koleksi buku perpustakaan.</p>
          {state.galat && <div className="login-error" role="alert">{state.galat}</div>}
          <label>
            Nama pengguna
            <input name="name" autoComplete="username" placeholder="Masukkan nama" required />
          </label>
          <label>
            Kata sandi
            <input name="password" type="password" autoComplete="current-password" placeholder="Masukkan kata sandi" required />
          </label>
          <button className="primary-button login-button" type="submit" disabled={pending}>
            {pending ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </main>
    </div>
  );
}
