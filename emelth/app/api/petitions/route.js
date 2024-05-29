import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export async function GET(){
    const result=await conn.query('SELECT * FROM vwPacientes');
    if (result){ return NextResponse.json({message:result})
}
}
