'use client'
import axios from "axios";
import { useSession } from 'next-auth/react'
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/components_encargado/layout";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';  // Import useRouter

const inter = Inter({ subsets: ["latin"] });

function Accepted() {
  const { data: session, status } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);  // Define loading state
  const router = useRouter();  // Define router

  useEffect(() => {
    if (status === "authenticated") {
      const rol = session.user?.name;

      if (rol === "3") {
        setLoading(false);
      } else if (rol === '1') {
        router.push("/crear");
      } else {
        setLoading(false);
      }
    } else if (status === "unauthenticated") {
      router.push('/signIn');
    }
  }, [session, status, router]);  // Add router to dependencies

  useEffect(() => {
    if (session) {
      console.log("Session data:", session); // Debug: log session data
      const userId = session.user?.email;

      if (userId) {
        axios.post("/api/acept", { id: userId })
          .then(res => {
            let requests = res.data.message;
            setRequests(requests);
          })
          .catch(error => {
            console.error('Error fetching petitions:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        console.error('User email is not available in the session');
        setLoading(false);
      }
    }
  }, [session]);

  if (loading) {
    return <div>Cargando...</div>; // Show loading indicator
  }

  return (
    <Layout>
      <main className={`min-h-screen flex-col items-center justify-between px-16 py-14 ${inter.className} h-full bg-slate-100 text-slate-800`}>
        <div>
          <table className="table-auto md:w-full text-sm snap-x scroll-pl-4 max-md:grid max-md:gap-x-12 max-md:overflow-x-scroll max-md:-mx-4 max-md:px-4 [&_thead]:bg-slate-50 max-md:[&_thead]:contents max-md:[&_tbody]:contents [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-100 max-md:[&_tr]:contents [&_th]:text-slate-900 [&_th]:font-semibold [&_td]:text-slate-600 [&_th]:py-3 md:[&_th]:first:pl-3 [md:&_th]:last:pr-3 [&_td]:pb-3 md:[&_td]:pt-3 md:[&_td]:first:pl-3 md:[&_td]:last:pr-3 [&_tr_td:first-child]:font-medium [&_tr_td:first-child]:text-slate-900 [&_th]:whitespace-nowrap [&_td]:whitespace-normal max-md:[&_th]:min-w-[60vw] max-md:[&_td]:min-w-[60vw] max-md:[&_tr:last-child_td]:min-w-[calc(100vw-2rem)] [&_th]:text-left [&_th]:group-last:text-right [&_td]:text-left md:[&_td:last-of-type]:text-right max-md:[&_th]:sticky max-md:[&_th]:left-0 [&_td]:snap-start max-md:[&_td]:border-b max-md:[&_td:last-of-type]:border-none [&_td]:border-slate-100" id="dTboor">
            <thead>
              <tr>
                <th className="max-md:row-start-1 max-md:col-start-1">Folio</th>
                <th className="max-md:row-start-3 max-md:col-start-1">Nombre</th>
                <th className="max-md:row-start-5 max-md:col-start-1">Apellido Paterno</th>
                <th className="max-md:row-start-7 max-md:col-start-1">Apellido Materno</th>
             
                <th className="max-md:row-start-13 max-md:col-start-1">Tipo Emergencia</th>
                <th className="max-md:row-start-15 max-md:col-start-1">Padecimiento</th>
                <th className="max-md:row-start-17 max-md:col-start-1">Estado</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                    <td>{index}</td>
                  <td>{request.per_nombre}</td>
                  <td>{request.per_appat}</td>
                  <td>{request.per_apmat}</td>
                
                  <td>{request.pac_padecimiento}</td>
                  <td>{request.est_estado}</td>
                  <td>{request.Emergency}</td>
                  <td>{request.Description}</td>
                  <td>{request.Estate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}

export default function AcceptedWrapped() {
  return (
    <SessionProvider>
      <Accepted />
    </SessionProvider>
  );
}
