"use client";

import React from "react";
React.useLayoutEffect = React.useEffect;
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useState, useEffect } from "react";
import Layout from "@/components/components_admin/layout";
import axios from 'axios';
import Link from 'next/link';
import { SessionProvider } from "next-auth/react";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";
function Mapas() {
  
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null); 

  useEffect(() => {
    // Llamada a la API para obtener los hospitales al cargar el componente
    axios.get("/api/hospitals")
      .then(res => {
        console.log(res.data.message);
        setHospitals(res.data.message); // Almacenar los hospitales en el estado
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
      });
  }, []); 

  const handleSelectChange = (event) => {
    const selectedKey = event.target.value;
    const selectedHospital = hospitals.find(hospital => hospital.key === selectedKey);
    setSelectedHospital(selectedHospital); // Actualizar el estado con el hospital seleccionado
  };

  return (
    <Layout>
      <main
        className={`min-h-screen flex-col items-center justify-between px-16 py-14 ${inter.className} h-full bg-slate-100 text-slate-800`}
      >
        <div className="flex flex-row h-full w-full">
          <div className="w-full h-full rounded-3xl p-5">
            <form className="flex items-center space-x-3">
              <select name="mapa" id="mapaWi" onChange={handleSelectChange}>
                <option value="">Seleccionar hospital</option>
                {/* Generar opciones para cada hospital */}
                {hospitals.map((hospital) => (
                  <option key={hospital.key} value={hospital.key}>
                    {hospital.Nombre}
                  </option>
                ))}
              </select>
            </form>

        

            <div className=" grid grid-cols-4 gap-10 mt-6 mx-auto">
              {hospitals.map((hospital) => (
              
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
<Link key={hospital.key} href={`/registroHospitales/${encodeURIComponent(hospital.Nombre)}`}>                  <img
                    className="w-full"
                    src="https://centrourbano.com/revista/wp-content/uploads/hospitaldexoco_g-1.jpg"
                    alt="Sunset in the mountains"
                  ></img>
                  </Link>
                  <div className="px-6 py-4">
                    
                    <div className="font-bold text-xl mb-2">{hospital.Nombre}</div>
                    <Link key={hospital.key} href={`/registroHospitales/${encodeURIComponent(hospital.Nombre)}`}></Link>
                    <p className="text-gray-700 text-base">{hospital.Calle}</p>
                    <p className="text-gray-700 text-base">{hospital.Colonia}</p>
                    <p className="text-gray-700 text-base">
                      {hospital.CodigoPostal}
                    </p>
                    <Link key={hospital.key} href={`/registroHospitales/${encodeURIComponent(hospital.Nombre)}`}></Link>
                  </div>
                  
                </div>
              ))}
              <div className="max-w-sm rounded overflow-hidden shadow-lg">

              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
export default function Maps(){
  return(
  <SessionProvider>
    <Mapas />
  </SessionProvider>
  );
}

  