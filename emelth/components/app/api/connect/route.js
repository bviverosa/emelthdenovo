import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export async function GET(){
    const result=await conn.query('SELECT NOW()');
    console.log(result)
    return NextResponse.json({message:"Hello world"})
}
