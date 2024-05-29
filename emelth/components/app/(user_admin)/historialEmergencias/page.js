'use client'
import axios from "axios";

import Layout from "@/components/components_encargado/layout";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
export default function(){
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    axios.get("/api/petitions")
      .then(res => {      
        let requests = res.data.message;
        setRequests(requests);
       
      })
      .catch(error => {
        console.error('Error fetching petitions:', error);
      });
  }, []);
    
    
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
                   
                  </tr>
                </thead>
                {/* Contenido de tabla */}
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={index}>
                      <td className={`max-md:row-start-${index + 1} max-md:col-start-${index + 1}`}>{}</td>
                      <td className={`max-md:row-start-${index + 3} max-md:col-start-${index + 1}`}>{request.Name}</td>
                      <td className={`max-md:row-start-${index + 5} max-md:col-start-${index + 1}`}>{request.LastName}</td>
                      <td className={`max-md:row-start-${index + 7} max-md:col-start-${index + 1}`}>{request.LastName2}</td>
                      <td className={`max-md:row-start-${index + 9} max-md:col-start-${index + 1}`}>{request.Age}</td>
                      <td className={`max-md:row-start-${index + 11} max-md:col-start-${index + 1}`}>{request.Sex}</td>
                      <td className={`max-md:row-start-${index + 13} max-md:col-start-${index + 1}`}>{request.Emergency}</td>
                      <td className={`max-md:row-start-${index + 15} max-md:col-start-${index + 1} break-all max-w-48`}>{request.Description}</td>
                      
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </Layout>
      );
}