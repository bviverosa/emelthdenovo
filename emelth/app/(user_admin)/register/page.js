'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { SessionProvider } from 'next-auth/react';
import Layout from "@/components/components_admin/layout";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import {validateUserRegister} from "@/components/validations/user";


function Register() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', rol: '' });

  const handleFormSubmit2 = (e) => {
    e.preventDefault();
   let answer=validateUserRegister(formData)
   alert(answer);
    

    

    setError('');

    // API call to register or login
   
  }

  return (

    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-16 py-14 ${inter.className} h-full bg-slate-100 text-slate-800`}
      >
        <div className="loginPage">
      <h1 className="loginPage-title">Registrar en mi Aplicación</h1>
      <form onSubmit={handleFormSubmit2}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <select
          name="rol"
          value={formData.rol}
          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
        >
          <option value="0">Selecciona un rol</option>
          <option value="1">Paramédico</option>
          <option value="2">Admin</option>
          <option value="3">Hospital</option>
        </select>
        <button type="submit">Iniciar sesión</button>
      </form>
      <h1 className="loginPage-title">Iniciar sesión en mi Aplicación</h1>
      {error && <p className="error">{error}</p>}
    </div>
        
      </main>
    </Layout>

    
  );
}

export default function LoginRegister(){
  return(
    <SessionProvider>
       <Register />
    </SessionProvider>

  );

};