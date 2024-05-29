
import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
const sql = `SELECT * from especialidad`;
export async function GET(){
    const sql = `SELECT * from especialidad`;
    const result= await conn.query(sql)
   
    return NextResponse.json({
        Status:"Success",
        data:result});
}
