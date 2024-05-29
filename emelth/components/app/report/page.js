"use client"
import React, { useState } from 'react';

const ErrorReportPage = () => {
  const [errorDescription, setErrorDescription] = useState('');
  const [page, setPage] = useState('');
  const [errorType, setErrorType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const reportData = {
      page: page,
      description: errorDescription,
      type: errorType
    };
    console.log('Reporte enviado:', reportData);
  
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Reportar Error</h1>
      {submitted ? (
        <p>Gracias por tu reporte. Lo hemos recibido correctamente.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
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
              <option value="">Seleccione un tipo de error</option>
              <option value="1">Error de Interfaz</option>
              <option value="2">Error de Funcionalidad</option>
              <option value="3">Error de Diseño</option>
              {/* Agrega más opciones según los tipos de error que desees */}
            </select>
          </div>
          <button type="submit">Enviar Reporte</button>
        </form>
      )}
    </div>
  );
};

export default ErrorReportPage;
