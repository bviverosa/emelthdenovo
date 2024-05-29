"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const ReportPage = () => {
  const [browserInfo, setBrowserInfo] = useState('');
  const [osInfo, setOsInfo] = useState('');
  const [errorReported, setErrorReported] = useState(false);
  const [errorUrl, setErrorUrl] = useState('');

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

  // Función para obtener el navegador del usuario
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del reporte a tu servidor o servicio de reporte
    axios.post("/api/reportes", { browserInfo, osInfo, status:404, url: errorUrl })
      .then(() => {
        setErrorReported(true);
      })
      .catch(error => {
        console.error('Error al enviar el reporte:', error);
        // Manejar el error de envío del reporte
      });
  };

  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no se encuentra.</p>
      <p>Puedes ayudarnos a mejorar informando este error.</p>
      {errorReported ? (
        <p>Gracias por tu reporte. Lo hemos recibido correctamente.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <button type="submit">Reportar Error</button>
        </form>
      )}
    </div>
  );
};

export default ReportPage;
