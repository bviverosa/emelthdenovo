'use client'

import React from "react";
import { Inter } from "next/font/google";
import Layout from "@/components/components_usu_no_registrado/layout";

const inter = Inter({ subsets: ["latin"] });

export default function ayuda() {
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center px-16 pt-16 ${inter.className} h-full bg-slate-100 text-slate-800`}
      >
        <div className="">
          <div class="introduction">
            <p class="text-4xl font-semibold">Preguntas frecuentes</p>
            <p class="text">
              Si alguna de las siguientes preguntas no satisface tus dudas,
              puedes contactarnos mediante el correo <a>emelth@gmail.com</a> o
              llenar el formulario de contacto
            </p>
          </div>

          <div class="questions">
            <details aria-expanded="false" class="question-expand">
              <summary class="question-text" onclick="cambiarIcono()">
                <p>Lorem ipsum</p>
                <i class="fa-solid fa-plus"></i>
              </summary>
              <div>
                <p class="answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  scelerisque pellentesque urna vel feugiat. Cras euismod
                  hendrerit ligula, ut commodo massa volutpat eu.
                </p>
              </div>
            </details>
            <details aria-expanded="false" class="question-expand">
              <summary class="question-text" onclick="cambiarIcono(this)">
                <p>Lorem ipsum</p>
                <i class="fa-solid fa-plus"></i>
              </summary>
              <div>
                <p class="answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  scelerisque pellentesque urna vel feugiat. Cras euismod
                  hendrerit ligula, ut commodo massa volutpat eu.
                </p>
              </div>
            </details>
            <details aria-expanded="false" class="question-expand">
              <summary class="question-text" onclick="cambiarIcono()">
                <p>Lorem ipsum</p>
                <i id="myIcon" class="fa-solid fa-plus"></i>
              </summary>
              <div>
                <p class="answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  scelerisque pellentesque urna vel feugiat. Cras euismod
                  hendrerit ligula, ut commodo massa volutpat eu.
                </p>
              </div>
            </details>
            <details aria-expanded="false" class="question-expand">
              <summary class="question-text" onclick="cambiarIcono()">
                <p>Lorem ipsum</p>
                <i id="myIcon" class="fa-solid fa-plus"></i>
              </summary>
              <div>
                <p class="answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  scelerisque pellentesque urna vel feugiat. Cras euismod
                  hendrerit ligula, ut commodo massa volutpat eu.
                </p>
              </div>
            </details>
            <details aria-expanded="false" class="question-expand">
              <summary class="question-text" onclick="cambiarIcono()">
                <p>Lorem ipsum</p>
                <i id="myIcon" class="fa-solid fa-plus"></i>
              </summary>
              <div>
                <p class="answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  scelerisque pellentesque urna vel feugiat. Cras euismod
                  hendrerit ligula, ut commodo massa volutpat eu.
                </p>
              </div>
            </details>
          </div>
        </div>
      </main>
    </Layout>
  );
}
