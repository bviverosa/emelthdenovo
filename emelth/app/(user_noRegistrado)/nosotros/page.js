import React from "react";
import { Inter } from "next/font/google";
import Layout from "@/components/components_usu_no_registrado/layout";

const inter = Inter({ subsets: ["latin"] });
export default function nosotros() {
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-16 py-14 ${inter.className} h-full bg-slate-100 text-slate-800`}
      >
        <div className="bg-slate-500 w-full h-96 mb-24 flex items-end pb-6">
          <p className="font-bold text-4xl px-10">Lorem Ipsum</p>
        </div>

        <div className="flex flex-col px-96 space-y-6 mb-24">
          <p className="font-bold text-4xl">Lorem Ipsum</p>
          <div className="bg-black h-1 w-16 text-justify my-2"></div>
          <p className="text-xl text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            scelerisque pellentesque urna vel feugiat. Cras euismod hendrerit
            ligula, ut commodo massa volutpat eu. Donec at viverra nibh. Aenean
            luctus, enim eget eleifend blandit, nulla lectus sollicitudin arcu,
            finibus tempus lectus diam vel felis. Aliquam a placerat diam. Nam
            orci nisl, sagittis eu placerat ac, dignissim et lectus. Etiam
            aliquam tincidunt magna, eget dictum diam egestas id.
          </p>
        </div>

        <div className="flex flex-row w-full h-full mb-10">
          <div className="w-1/2 bg-slate-500 "></div>
          <div className="w-1/2 bg-slate-200 min-h-[600px] p-16 space-y-8 flex flex-col justify-center">
            <div className="space-y-5">
              <p className="font-semibold text-2xl">Mision</p>
              <div className="bg-black h-1 w-16"></div>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                scelerisque pellentesque urna vel feugiat. Cras euismod
                hendrerit ligula, ut commodo massa volutpat eu.
              </p>
            </div>

            <div className="space-y-5">
              <p className="font-semibold text-2xl">Vision</p>
              <div className="bg-black h-1 w-16"></div>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                scelerisque pellentesque urna vel feugiat. Cras euismod
                hendrerit ligula, ut commodo massa volutpat eu.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
