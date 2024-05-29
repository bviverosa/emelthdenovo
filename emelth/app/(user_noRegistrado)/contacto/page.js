import React from "react";
import { Inter } from "next/font/google";
import Layout from "@/components/components_usu_no_registrado/layout";
import Escudo from "@/components/iconos/escudo";

const inter = Inter({ subsets: ["latin"] });

export default function contacto() {
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-16 pt-14 ${inter.className} h-full bg-slate-100 text-slate-800`}
      >
        <div className="flex flex-row h-full ">
          <div className="w-1/2 min-h-full bg-slate-800 text-slate-100 p-24 rounded-l-3xl flex flex-col justify-center space-y-5">
            <p className="text-4xl font-semibold">
              Queremos saber lo que piensas.
            </p>
            <p className="font-light text-sm">
              Haznos llegar tus opiniones o preguntas mediante el siguiente
              formulario o el correo electrónico emelth@gmail.com.
            </p>
          </div>
          <div className="w-1/2 min-h-full bg-slate-200 p-24 px-32 rounded-r-3xl flex flex-col justify-center">
            <form className="space-y-8 justify-center flex flex-col ">
              <div className="flex flex-col space-y-2">
                <div className="form-heading">
                  <p className="heading-input">Nombre completo</p>
                </div>
                <input
                  type="email"
                  placeholder="Escriba su correo electrónico"
                  className="h-9 rounded-md px-3"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="form-heading">
                  <p className="heading-input">Correo electrónico</p>
                </div>
                <input
                  type="password"
                  placeholder="Escriba su contraseña"
                  className="h-9 rounded-md px-3"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <div className="form-heading">
                  <p className="heading-input">Mensaje</p>
                </div>
                <textarea
                  type="text"
                  placeholder="Escriba su mensaje"
                  className=" rounded-md p-3 h-40 resize-none"
                />
              </div>
              <button className="w-1/2 h-9 bg-green-600 rounded-md mx-auto">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
