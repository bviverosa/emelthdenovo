import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";

export async function GET() {
    const sql = `SELECT DISTINCT Nombre, Telefono, Calle, Colonia, CodigoPostal FROM vwhospital`;
    const result = await conn.query(sql);
    return NextResponse.json({ message: result });
}

export async function POST(request) {
    const newHospital = await request.json();
    const data = newHospital.hospitalData;
    const esp = newHospital.newEsp;

    // Insertar la dirección del hospital
    const insertDireccionSQL = `INSERT INTO direccion(dir_calle, dir_colonia, dir_cp) VALUES (?, ?, ?)`;
    const direccionValues = [data.Calle, data.Colonia, data.CodigoPostal];
    const direccionResult = await conn.query(insertDireccionSQL, direccionValues);

    // Insertar el hospital
    const insertHospitalSQL = `INSERT INTO hospital(hos_nombre, hos_telefono, id_dir) VALUES (?, ?, ?)`;
    const hospitalValues = [data.Nombre, data.Telefono, direccionResult.insertId];
    const hospitalResult = await conn.query(insertHospitalSQL, hospitalValues);

    // Insertar las relaciones hospital-especialidad
    for (const especialidad of esp) {
        await insertarRelacionHospitalEspecialidad(hospitalResult.insertId, especialidad.id);
    }

    return NextResponse.json({ message: "registrado"});
}

async function insertarRelacionHospitalEspecialidad(idHospital, idEspecialidad) {
    const insertRelacionSQL = `INSERT INTO especialidad_hospital (id_hos, id_esp) VALUES (?, ?)`;
    await conn.query(insertRelacionSQL, [idHospital, idEspecialidad]);
    
}
