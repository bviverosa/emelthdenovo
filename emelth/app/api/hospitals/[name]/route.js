import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export async function GET(request,{params}){
    const hospitalData = {
        especialidades: [],
        informacionHospital: {}
    };
    let newName=decodeURIComponent(params.name)
    const result = await conn.query(`SELECT DISTINCT especialidad, Telefono,Calle,Colonia,CodigoPostal
    FROM vwhospital
    WHERE Nombre = ?`,newName);
   
    result.forEach(row => {
        // Si no hemos almacenado la información del hospital todavía, la almacenamos
        if (Object.keys(hospitalData.informacionHospital).length === 0) {
            hospitalData.informacionHospital = {
                Telefono: row.Telefono,
                Calle: row.Calle,
                Colonia: row.Colonia,
                CodigoPostal: row.CodigoPostal
            };
        }
        // Almacenamos las especialidades
        hospitalData.especialidades.push(row.Especialidad);
    });
    
    return NextResponse.json({
        Status:"Success",
        data:hospitalData});
}
export async function PUT(request,{params}){
    const request1=await request.json();
    const data= request1.data;
    
    const name=decodeURIComponent(params.name)
    console.log(name)
    const sql= `SELECT id_dir FROM hospital WHERE hos_nombre= ?`
    
    
    const sqlinsert=await conn.query(`UPDATE hospital SET ? WHERE hos_nombre =?`,[
        data,
        params.name
    ])
    if(sqlinsert.affectedRows===0){
        return NextResponse.json(
            {
                message:"Hospital no encontrado",
                
            },
            {status:404,
            }
        )
    }else{
       const updatedHospital= await conn.query(`SELECT DISTINCT especialidad, Telefono,Calle,Colonia,CodigoPostal
        FROM vwhospital
        WHERE Nombre = ?`,params.name);
        console.log(updatedHospital)
        return NextResponse.json("Actualizado")
    }

    
    
}