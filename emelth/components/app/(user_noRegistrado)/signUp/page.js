import React from "react";
import { Inter } from "next/font/google";

import Escudo from "@/components/iconos/escudo";

const inter = Inter({ subsets: ["latin"] });

export default function signin_signup() {
  return (
    <div>
      <header className="bg-white shadow text-slate-600">
        <div className="flex h-14 items-center px-10 space-x-4">
          <a href="/">
            <Escudo className="h-7 w-7"></Escudo>
          </a>
          <p className="text-xl text-gray-900 font-medium">Emelth</p>
        </div>
      </header>

      <main
        className={`items-center justify-between px-16 py-14 ${inter.className} h-[93vh] bg-slate-100 text-slate-800`}
      >
        <div className="flex flex-row h-full ">
          <div className="w-1/2 h-full bg-slate-200 p-24 px-32 rounded-l-3xl flex flex-col justify-center">
            <form className="space-y-8">
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-semibold">Registrarse</h1>
              </div>

              <div className=" flex flex-row space-x-10">
                <div className="flex flex-col space-y-2 w-1/2">
                  <div className="form-heading">
                    <p className="heading-input">Correo electrónico</p>
                  </div>
                  <input
                    type="email"
                    placeholder="Escriba su correo electrónico"
                    className="h-9 rounded-md px-3 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-2 w-1/2">
                  <div className="form-heading">
                    <p className="heading-input">Nombre completo</p>
                  </div>
                  <input
                    type="email"
                    placeholder="Escriba su correo electrónico"
                    className="h-9 rounded-md px-3 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="form-heading">
                  <p className="heading-input">Contraseña</p>
                </div>
                <input
                  type="password"
                  placeholder="Escriba su contraseña"
                  className="h-9 rounded-md px-3"
                />
              </div>
              <button className="w-full h-9 bg-green-600 rounded-md text-white">
                Registrarse
              </button>
              <div className="flex space-x-2 text-sm">
                <h1>¿Ya tienes una cuenta?</h1>
                <a href="/" className="hover:text-lime-600">
                  Ingresar
                </a>
              </div>
            </form>
          </div>
          <div className="w-1/2 h-full bg-slate-800 text-slate-100 p-24 rounded-r-3xl justify-center items-center">
            <div className="w-36 h-36 bg-red-600 rounded-full absolute translate-x-32"></div>
            <img
              src="C:\Users\maxim\OneDrive\Escritorio\Emelth Next\emelth\components\img\cosoAzul.png"
              className="absolute"
            ></img>
            <img
              src="https://png.pngtree.com/png-vector/20220723/ourmid/pngtree-female-paramedic-semi-flat-color-vector-character-png-image_6047268.png"
              className="h-5/6 w-5/6 mx-auto relative"
            ></img>
          </div>
        </div>
      </main>
    </div>
  );
}
