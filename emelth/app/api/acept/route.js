import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export async function POST(request){
    const request1= await request.json();
    const data= request1.id;
    console.log(data)
    const result=await conn.query('SELECT * FROM respuestapet where id_res= ?',[
        data

    ]);
    console.log(result)
    if (result){ return NextResponse.json({message:result})
}
return NextResponse.json({message:"fallo"})

}