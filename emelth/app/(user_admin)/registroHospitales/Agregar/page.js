'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HospitalDetails({ params }) {
    const [hospitalData, setHospitalData] = useState([
        
    ]);
    const [especialidades, setEspecialidades] = useState([]);
    const [newEsp, setNewEsp] = useState([]);

    const [error, setError] = useState(null);
    const [selectedEspecialidad, setSelectedEspecialidad] = useState('');


    useEffect(() => {
        axios.get("/api/especialidades")
            .then(res => {
                let data = res.data;
                if (data.Status === "Success") {
                    
                    setEspecialidades(data.data);
                    
                } else {
                    setError('Error al obtener la lista de especialidades. Por favor, intente de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error al obtener la lista de especialidades:', error);
                setError('Error al obtener la lista de especialidades. Por favor, intente de nuevo.');
            });
    },[]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHospitalData(prevData => ({
            ...prevData,
           [name]:value
        }));
    };

    const handleAddEspecialidad = () => {
        if (selectedEspecialidad.trim() !== '') {
            const especialidadToAdd = especialidades.find(especialidad => especialidad.esp_especialidad === selectedEspecialidad);
            if (especialidadToAdd) {
                // Verifica si la especialidad ya existe en newEsp
                const especialidadExistente = newEsp.find(especialidad => especialidad.id === especialidadToAdd.id_esp);
                if (especialidadExistente) {
                    console.log('La especialidad ya existe en la lista.');
                    // Realiza alguna acción si la especialidad ya existe, como mostrar un mensaje de error
                } else {
                    const nuevaEspecialidad = { id: especialidadToAdd.id_esp, nombre: especialidadToAdd.esp_especialidad };
                    setNewEsp([...newEsp, nuevaEspecialidad]); 
                    setSelectedEspecialidad('');
                }
            }
        }
    };
    
    
    

    const handleDeleteEspecialidad = (index) => {
        setNewEsp(prevData => prevData.filter((_, i) => i !== index));
    };
    

    const handleSubmit = () => {
        console.log(newEsp)
       axios.post("/api/hospitals",{hospitalData,newEsp});
         console.log(hospitalData)
    
    };
    

    if (error) {
        return <div>{error}</div>;
    }

    if (especialidades.length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-6">
    <h2 className="text-2xl font-bold mb-2">Agregar especialidad:</h2>
    <select className="form-select" value={selectedEspecialidad} onChange={(e) => setSelectedEspecialidad(e.target.value)}>
        {especialidades.map(especialidad => (
            <option key={especialidad.esp_id} value={especialidad.esp_especialidad}>
                {especialidad.esp_especialidad}
              
            </option>
        ))}
    </select>
    <button
        onClick={handleAddEspecialidad}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
        Agregar Especialidad
    </button>
</div>

            

            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Especialidades:</h2>
                <ul className="list-disc pl-5">
                {newEsp.map((especialidad, index) => (
            <li key={index}>{especialidad.nombre}
              <button onClick={() => handleDeleteEspecialidad(index)}>Eliminar</button>
            </li>
        ))}
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Información del Hospital:</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Telefono:</label>
                        <input
                            type="text"
                            name="Telefono"
                            
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Nombre:</label>
                        <input
                            type="text"
                            name="Nombre"
                      
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Calle:</label>
                        <input
                            type="text"
                            name="Calle"
                      
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Colonia:</label>
                        <input
                            type="text"
                            name="Colonia"
                            
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Código Postal:</label>
                        <input
                            type="text"
                            name="CodigoPostal"
                            
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Agregar Hospital
            </button>
        </div>
    );
}
