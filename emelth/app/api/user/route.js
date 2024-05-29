import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import bcrypt from "bcrypt";
import util from "util";
import { websocket } from "@/lib/generate";
const saltRounds = 10;

const queryAsync = util.promisify(conn.query).bind(conn);



export async function POST(request) {
    const { username, password, rol } = await request.json();
    const idper = '1';

    const checkEmailSql = 'SELECT * FROM usuario WHERE usu_correo = ?';
    try {
        const result = await queryAsync(checkEmailSql, [username]);

        if (result.length > 0) {
            return NextResponse.json({ message: "Usuario ya existe" });
        } else {
            const sql1 = "SELECT COUNT(*) AS total_registros FROM websocketid;";
            const result1 = await queryAsync(sql1);
            const totalRegistros = result1[0].total_registros;
            console.log(rol);
            const WebSocketId = websocket(rol, totalRegistros);

            const sql2 = "INSERT INTO websocketid(ws_webid) VALUES (?)";
            const result2 = await conn.query(sql2, [WebSocketId]);
            console.log(result2.insertId);

            const sql = 'INSERT INTO usuario (id_per, usu_correo, usu_pass, id_rol, id_wsid) VALUES (?, ?, ?, ?, ?)';
            const hash = await bcrypt.hash(password.toString(), saltRounds);
            const values = [idper, username, hash, rol, result2.insertId];

            await queryAsync(sql, values);

            return NextResponse.json({ message: 'Usuario registrado exitosamente' });
        }
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: 'Error interno del servidor' });
    }
}

