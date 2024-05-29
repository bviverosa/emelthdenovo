'use client'
import Image from "next/image";
import { Inter } from "next/font/google";

import Layout from "@/components/components_admin/layout";

import { useSession } from 'next-auth/react'
import { SessionProvider } from "next-auth/react";
import {useRouter} from 'next/navigation';
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

 function Homepage() {
  const router= useRouter();

  const [loading, setLoading] = useState(true); // Estado de carga
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      const rol = session.user?.name;
      console.log(session.user);
      if (rol ==="3"){
        
      }
      if (rol === '1') {
       setLoading(false);

      
      } else if (rol !== '3' && rol !== '1') {
       
      }
      else{
        
      }

      // Finaliza la carga cuando se ha realizado la comprobación
    } else if (status === "unauthenticated") {
      router.push('/signIn');
    }
  }, [session, status]);
  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se realiza la comprobación
  }
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-16 py-14 ${inter.className} h-full bg-slate-100 text-slate-800`}
      >
        <div>
          <p>Home</p>
        </div>
        
      </main>
    </Layout>
  );
}
export default function page(){
  return (
    <SessionProvider >
      <Homepage />
    </SessionProvider>
  );

}
