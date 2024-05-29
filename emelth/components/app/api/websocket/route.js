import { NextResponse } from "next/server";
import { websocket } from "@/lib/generate";
import { conn } from "@/lib/mysql";


export async function POST(request) {
   const {id}= await request.json();
   const sql = "select ws_webid as websocketid from websocketid where id_wsid = ?;";
   const result= await conn.query(sql,[id]);
   console.log(result);
   const websocketid = result[0];
   console.log(websocketid)

    return NextResponse.json(websocketid);

   
 
    
    

    
}
