'use client'
import { useEffect, useState } from "react";
import React from "react";
import Layout from "@/components/components_encargado/layout";
import axios from "axios";
import { Inter } from "next/font/google";
import io, { connect } from "socket.io-client";
import { useSession } from 'next-auth/react'
import { SessionProvider } from "next-auth/react";
import {useRouter} from 'next/navigation';
import Error from 'next/error';


const socket = io.connect("http://192.168.20.187:3001");
const inter = Inter({ subsets: ["latin"] });

function GestionPeticiones() {
  const [error, setError] = useState(null);
  const router= useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status === "authenticated") {
      const rol = session.user?.name;
      
      if (rol ==="3"){
        
      }
      if (rol === '1') {
        // router.push("/HomeAdmin");
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
          socket.emit('client_id', { client_id: websocketid });
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
      const handleRequests = (data) => {
       
  // Update the state with the array of requests
        setRequests(data);
        console.log(requests)
      };
      
      socket.on("connect",()=>{
      
        socket.emit("client_id",
          { client_id: websocketid }
            )      
          })
      socket.on("recieve_message", handleReceiveMessage);
      socket.on("unread_petitions", handleReceiveUnread);
      socket.on("server_requests", handleRequests);
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

  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se realiza la comprobación
  }


  return (
    <Layout>
      <main className={`min-h-screen flex-col items-center justify-between px-16 py-14 ${inter.className} h-full bg-slate-100 text-slate-800`}>
        <div>
        
          <table className="table-auto md:w-full text-sm snap-x scroll-pl-4 max-md:grid max-md:gap-x-12 max-md:overflow-x-scroll max-md:-mx-4 max-md:px-4 [&_thead]:bg-slate-50 max-md:[&_thead]:contents max-md:[&_tbody]:contents [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-100 max-md:[&_tr]:contents [&_th]:text-slate-900 [&_th]:font-semibold [&_td]:text-slate-600 [&_th]:py-3 md:[&_th]:first:pl-3 [md:&_th]:last:pr-3 [&_td]:pb-3 md:[&_td]:pt-3 md:[&_td]:first:pl-3 md:[&_td]:last:pr-3 [&_tr_td:first-child]:font-medium [&_tr_td:first-child]:text-slate-900 [&_th]:whitespace-nowrap [&_td]:whitespace-normal max-md:[&_th]:min-w-[60vw] max-md:[&_td]:min-w-[60vw] max-md:[&_tr:last-child_td]:min-w-[calc(100vw-2rem)] [&_th]:text-left [&_th]:group-last:text-right [&_td]:text-left md:[&_td:last-of-type]:text-right max-md:[&_th]:sticky max-md:[&_th]:left-0 [&_td]:snap-start max-md:[&_td]:border-b max-md:[&_td:last-of-type]:border-none [&_td]:border-slate-100" id="dTboor">
            {/* Encabezado de tabla */}
            <thead>
              <tr>
                <th className="max-md:row-start-1 max-md:col-start-1">Folio</th>
                <th className="max-md:row-start-3 max-md:col-start-1">Nombre</th>
                <th className="max-md:row-start-5 max-md:col-start-1">Apellido Paterno</th>
                <th className="max-md:row-start-7 max-md:col-start-1">Apellido Materno</th>
                <th className="max-md:row-start-9 max-md:col-start-1">Edad</th>
                <th className="max-md:row-start-11 max-md:col-start-1">Sexo</th>
                <th className="max-md:row-start-13 max-md:col-start-1">Tipo Emergencia</th>
                <th className="max-md:row-start-15 max-md:col-start-1">Padecimiento</th>
                <th className="max-md:row-start-[17] max-md:col-start-1">
                  <span className="sr-only">Aceptar</span>
                </th>
                <th className="max-md:row-start-[19] max-md:col-start-1">
                  <span className="sr-only">Rechazar</span>
                </th>
              </tr>
            </thead>
            {/* Contenido de tabla */}
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td className={`max-md:row-start-${index + 1} max-md:col-start-${index + 1}`}>{/* Folio */}</td>
                  <td className={`max-md:row-start-${index + 3} max-md:col-start-${index + 1}`}>{request.Name}</td>
                  <td className={`max-md:row-start-${index + 5} max-md:col-start-${index + 1}`}>{request.LastName}</td>
                  <td className={`max-md:row-start-${index + 7} max-md:col-start-${index + 1}`}>{request.LastName2}</td>
                  <td className={`max-md:row-start-${index + 9} max-md:col-start-${index + 1}`}>{request.Age}</td>
                  <td className={`max-md:row-start-${index + 11} max-md:col-start-${index + 1}`}>{request.Sex}</td>
                  <td className={`max-md:row-start-${index + 13} max-md:col-start-${index + 1}`}>{request.Emergency}</td>
                  <td className={`max-md:row-start-${index + 15} max-md:col-start-${index + 1} break-all max-w-48`}>{request.Description}</td>
                  <td className={`max-md:row-start-${index + 17} max-md:col-start-${index + 1}`}>
                    <button className="inline-flex justify-center items-center rounded-lg bg-green-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group">
                      <span className="md:sr-only">Aceptar</span>
                      <span className="tracking-normal text-white md:text-white group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out max-md:ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                          <path fill="currentColor" d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"/>
                        </svg>
                      </span>
                    </button>
                  </td>
                  <td className={`max-md:row-start-${index + 19} max-md:col-start-${index + 1}`}>
                    <button className="inline-flex justify-center items-center rounded-lg bg-red-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group">
                      <span className="md:sr-only">Rechazar</span>
                      <span className="tracking-normal text-white md:text-white group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out max-md:ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="">
                          <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                            <path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" />
                            <path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" />
                          </g>
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}

export default function GestionPeticionesWrapper() {
  return (
    <SessionProvider >
      <GestionPeticiones />
    </SessionProvider>
  );
}
