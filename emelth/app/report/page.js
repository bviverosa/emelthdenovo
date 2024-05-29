"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const ErrorReportPage = () => {
  const [browserInfo, setBrowserInfo] = useState('');
  const [osInfo, setOsInfo] = useState('');
  const [errorReported, setErrorReported] = useState(false);
  const [errorUrl, setErrorUrl] = useState('');

  const [errorDescription, setErrorDescription] = useState('');
  const [page, setPage] = useState('');
  const [errorType, setErrorType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    // Obtener información del navegador y el sistema operativo del usuario
    const userAgent = navigator.userAgent;
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);
    
    setBrowserInfo(browser);
    setOsInfo(os);

    // Obtener la URL de la página no encontrada
    setErrorUrl(window.location.href);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/reportes", { browserInfo, osInfo, status:404, url: errorUrl })
    .then(() => {
      setErrorReported(true);
    })
    .catch(error => {
      console.error('Error al enviar el reporte:', error);
      // Manejar el error de envío del reporte
    });
   
   
    const reportData = {
      page: page,
      description: errorDescription,
      type: errorType
    };
    console.log('Reporte enviado:', reportData);
  
    setSubmitted(true);
  };
  const getBrowser = (userAgent) => {
    const ua = userAgent.toLowerCase();
    const match = /(edge|opera|chrome|safari|firefox)\/([\d.]+)/.exec(ua) || /(trident)(?:.*? rv:([\d.]+))?/.exec(ua) || [];
    return match[1] || '';
  };

  // Función para obtener el sistema operativo del usuario
  const getOS = (userAgent) => {
    const ua = userAgent.toLowerCase();
    const match = /(windows|mac os|iphone|ipad|ipod|android)/.exec(ua) || [];
    return match[1] || '';
  };

  return (
    <main
        className={`items-center justify-between px-16 py-14 h-[100vh] bg-slate-100 text-slate-800`}
      >
    <div className='flex flex-col '>
      <h1 className='text-2xl text-slate-900'>Reportar Error</h1>
      {submitted ? (
        <p>Gracias por tu reporte. Lo hemos recibido correctamente.</p>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className=''>
            <label htmlFor="errorDescription">Descripción del Error:</label>
            <textarea
              id="errorDescription"
              value={errorDescription}
              onChange={(e) => setErrorDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="page">Página donde ocurrió el Error:</label>
            <select
              id="page"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              required
            >
              <option value="">Seleccione una página</option>
              <option value="1">Inicio</option>
              <option value="2">Productos</option>
              <option value="3">Contacto</option>
      
            </select>
          </div>
          <div>
            <label htmlFor="errorType">Tipo de Error:</label>
            <select
              id="errorType"
              value={errorType}
              onChange={(e) => setErrorType(e.target.value)}
              required
            >
              <option value="">Seleccione un tipo de emergencia</option>
              <option value="1">Error de Interfaz</option>
              <option value="2">Error de Funcionalidad</option>
              <option value="3">Error de Diseño</option>
              {/* Agrega más opciones según los tipos de error que desees */}
            </select>
          </div>
          <button type="submit" className="h-9 rounded-md px-3 bg-green-300">Enviar Reporte</button>
        </form>
      )}
    </div>
    </main>
  );
};

export default ErrorReportPage;
