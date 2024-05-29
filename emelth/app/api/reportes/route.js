import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const data = await request.json();
      if(data.browserInfo == "chrome "){

      }
      console.log(data);
      // Procesar la solicitud aquí...
      return NextResponse.json({ message: "Solicitud procesada correctamente" });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      return NextResponse.error("Error interno del servidor", { status: 500 });
    }
  }
  