import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export  async function GET(){
    const sql = `SELECT DISTINCT Nombre, Telefono,Calle, Colonia, CodigoPostal 
    FROM vwhospital;
    `;
    const result= await conn.query(sql);
    console.log(result)
    return NextResponse.json({message:result})
   
    
}
