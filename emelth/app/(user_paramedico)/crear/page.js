"use client"
import { useEffect, useState } from "react";
import React from "react";
import Layout from "@/components/components_encargado/layout";
import axios from "axios";
import { Inter } from "next/font/google";
import io from "socket.io-client";
import { useSession } from 'next-auth/react'
import { SessionProvider } from "next-auth/react";
import {useRouter} from 'next/navigation';
import Error from 'next/error';
const socket = io("http://10.0.0,23:3001");

function TabTwoScreen() {
  const [loading, setLoading] = useState(true); // Estado de carga
   const [requests, setRequests] = useState([]);
  const router= useRouter();
  const regex = /^[A-Z][a-z\s]*$/;
  
  function validate(name) {
    return regex.test(name);
  }

  const handleReceiveMessage = (data) => {
    const request1 = data;
    const messageObject = request1.message;
    console.log(messageObject.Type);
  };
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status === "authenticated") {
      const rol = session.user?.name;
      
      if (rol ==="3"){
        router.push("/gestionarPeticiones")
      }
      if (rol === '1') {
       
        setLoading(false)
      
      } else if (rol !== '3' && rol !== '1') {
       
      }
      else{
        
      }

      // Finaliza la carga cuando se ha realizado la comprobación
    } else if (status === "unauthenticated") {
      router.push('/signIn');
    }
  }, [session, status]);

  useEffect(() => {
    if (session) {
      axios.post("../api/websocket",{id:session.user.email}).then(res => {      
        const websocketid=res.data.websocketid  
        const rol=session.user.name
          socket.emit('client_id', { client_id: websocketid, rol:rol, id:session.user.email});

      })
      const handleReceiveUnread=(data)=>{
        let unread=data.message
        console.log(unread)
      }
      const handleReceiveMessage = (data) => {
        let request1 = data.message;
        if (request1.Type === "request") {
          console.log(request1)
          setRequests(prevState => [...prevState, request1]);
        }
      };
      
     
      
      
     
      socket.on("recieve_message", handleReceiveMessage);
      socket.on("unread_petitions", handleReceiveUnread);
      socket.on("server_requests",(data)=>{
        setRequests(data);
      })
      socket.on("accepted_pet",(data)=>{
        console.log(data);
      })
      
      socket.on("server_message", (data) => {
        console.log(data);
      });
      socket.on("connect_error", (error) => {
        setError(error);
        throw new Error("Error de conexión");
      });

      return () => {
      
      
        socket.off("recieve_message", handleReceiveMessage);
        socket.off("server_message");
        socket.off("server_requests");
      };
    }
  }, [session]);

  useEffect(() => {
    socket.on("recieve_message", handleReceiveMessage);
    socket.on("server_message", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("recieve_message", handleReceiveMessage);
      console.log("Unsubscribing from receive_message");
      socket.off("server_message");
    };
  }, []);

  const [emergencyButtons, setEmergencyButtons] = useState([
    { id: "1", label: "C1", value: "1" },
    { id: "2", label: "C2", value: "2" },
    { id: "3", label: "C3", value: "3" },
    { id: "4", label: "C4", value: "4" },
    { id: "5", label: "C5", value: "5" },
  ]);

  const [sexButtons, setSexButtons] = useState([
    { id: "1", label: "Femenino", value: "1" },
    { id: "2", label: "Masculino", value: "2" },
  ]);

  const handleInputChange = (name, value) => {
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendData = () => {
    socket.emit("send_message", { message: patientData, session:session.user.email });
    console.log(validate(patientData.Name));
    
    setPatientData({
      Type: "request",
      Name: "",
      LastName: "",
      LastName2: "",
      Description: "",
      Age: "",
      Emergency: "",
      Sex: "",
      Send:"",

    });
    
  };

  const [patientData, setPatientData] = useState({
    Type: "request",
    Name: "",
    LastName: "",
    LastName2: "",
    Description: "",
    Emergency: "",
    Age: "",
    Sex: "",
    
  });
  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se realiza la comprobación
  }
  return (
    <div className="min-h-screen min-w-screen space-y-14 flex flex-row bg-teal-500 p-14">
      <div className="w-1/2" style={{ flex: 1, padding: 20, paddingTop: 50 }}>
        <h2 style={{ color: "white", fontSize: 20, marginBottom: 10 }}>Crear Folio</h2>
        <p style={{ color: "white" }}>Selecciona el nivel de emergencia</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          {emergencyButtons.map((button) => (
            <label key={button.id} style={{ color: 'white', marginRight: 10 }}>
              <input
                type="radio"
                value={button.value}
                checked={patientData.Emergency === button.value}
                onChange={() => handleInputChange('Emergency', button.value)}
              />
              {button.label}
            </label>
          ))}
        </div>
        <p style={{ color: "white" }}>Nombre paciente</p>
        <input
          style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, color: "black", padding: 10 }}
          onChange={(e) => handleInputChange("Name", e.target.value)}
          value={patientData.Name}
          placeholder="Nombre del paciente"
        />
        <p style={{ color: "white" }}>Apellido Paterno</p>
        <input
          style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, color: "black", padding: 10 }}
          onChange={(e) => handleInputChange("LastName", e.target.value)}
          value={patientData.LastName}
          placeholder="Apellido Paterno"
        />
        <p style={{ color: "white" }}>Apellido Materno</p>
        <input
          style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, color: "black", padding: 10 }}
          onChange={(e) => handleInputChange("LastName2", e.target.value)}
          value={patientData.LastName2}
          placeholder="Apellido Materno"
        />
        <p style={{ color: "white" }}>Edad</p>
        <input
          style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, color: "black", padding: 10 }}
          onChange={(e) => handleInputChange("Age", e.target.value)}
          value={patientData.Age}
          placeholder="Edad"
          type="number"
        />
        <p style={{ color: "white" }}>Sexo</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          {sexButtons.map((button) => (
            <label key={button.id} style={{ color: 'white', marginRight: 10 }}>
              <input
                type="radio"
                value={button.value}
                checked={patientData.Sex === button.value}
                onChange={() => handleInputChange('Sex', button.value)}
              />
              {button.label}
            </label>
          ))}
        </div>
        <p style={{ color: "white" }}>Padecimiento actual</p>
        <input
          style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, color: "black", padding: 10 }}
          onChange={(e) => handleInputChange("Description", e.target.value)}
          value={patientData.Description}
          placeholder="Padecimiento"
        />
        <button onClick={handleSendData} style={{ height: 40, backgroundColor: "#1F2937", color: "white", padding: 10 }}>
          Generar
        </button>
      </div>

      <div className="w-1/2">
          <div>
          
          <table className="table-auto md:w-full text-sm snap-x scroll-pl-4 max-md:grid max-md:gap-x-12 max-md:overflow-x-scroll max-md:-mx-4 max-md:px-4 [&_thead]:bg-slate-50 max-md:[&_thead]:contents max-md:[&_tbody]:contents [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-100 max-md:[&_tr]:contents [&_th]:text-slate-900 [&_th]:font-semibold [&_td]:text-slate-600 [&_th]:py-3 md:[&_th]:first:pl-3 [md:&_th]:last:pr-3 [&_td]:pb-3 md:[&_td]:pt-3 md:[&_td]:first:pl-3 md:[&_td]:last:pr-3 [&_tr_td:first-child]:font-medium [&_tr_td:first-child]:text-slate-900 [&_th]:whitespace-nowrap [&_td]:whitespace-normal max-md:[&_th]:min-w-[60vw] max-md:[&_td]:min-w-[60vw] max-md:[&_tr:last-child_td]:min-w-[calc(100vw-2rem)] [&_th]:text-left [&_th]:group-last:text-right [&_td]:text-left md:[&_td:last-of-type]:text-right max-md:[&_th]:sticky max-md:[&_th]:left-0 [&_td]:snap-start max-md:[&_td]:border-b max-md:[&_td:last-of-type]:border-none [&_td]:border-slate-100" id="dTboor">
            {/* Encabezado de tabla */}
            <thead>
              <tr>
                <th className="max-md:row-start-1 max-md:col-start-1">ID</th>
                <th className="max-md:row-start-3 max-md:col-start-1">Nombre</th>
                <th className="max-md:row-start-5 max-md:col-start-1">Apellido Paterno</th>
                <th className="max-md:row-start-7 max-md:col-start-1">Apellido Materno</th>
                <th className="max-md:row-start-9 max-md:col-start-1">Padecimiento</th>
                <th className="max-md:row-start-11 max-md:col-start-1">Estado</th>
                <th className="max-md:row-start-13 max-md:col-start-1">ID res</th>
              </tr>
            </thead>
            {/* Contenido de tabla */}
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td className={`max-md:row-start-${index + 1} max-md:col-start-${index + 1}`}>{index}</td>
                  <td className={`max-md:row-start-${index + 3} max-md:col-start-${index + 1}`}>{request.per_nombre}</td>
                  <td className={`max-md:row-start-${index + 5} max-md:col-start-${index + 1}`}>{request.per_appat}</td>
                  <td className={`max-md:row-start-${index + 7} max-md:col-start-${index + 1}`}>{request.per_apmat}</td>
                  <td className={`max-md:row-start-${index + 9} max-md:col-start-${index + 1}`}>{request.pac_padecimiento}</td>
                  <td className={`max-md:row-start-${index + 11} max-md:col-start-${index + 1}`}>{request.est_estado}</td>
                  <td className={`max-md:row-start-${index + 13} max-md:col-start-${index + 1}`}>{request.id_res}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default function GestionPeticionesWrapper() {
  return (
    <SessionProvider >
      <TabTwoScreen />
    </SessionProvider>
  );
}
