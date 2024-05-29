import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import bcrypt from "bcrypt";
import util from "util";

const queryAsync = util.promisify(conn.query).bind(conn);

export async function POST(request) {
    const { username, password } = await request.json();
    console.log(username);
    console.log(password)
    const checkEmailSql = 'SELECT * FROM usuario WHERE usu_correo = ?';
    try {
        const result = await queryAsync(checkEmailSql, [username]);

        if (result.length > 0) {
            const match = await bcrypt.compare(password.toString(), result[0].usu_pass);
            if (match) {
                return NextResponse.json({
                    Status: "Success",
                    user: {
                        id: `${result[0].id_usu}`,
                        rol: `${result[0].id_rol}`,
                        WebSocketId: `${result[0].id_wsid}`
                    }
                });
            } else {
                return NextResponse.json({ message: "wrong password" });
            }
        } else {
            return NextResponse.json({ message: "Email not existing" });
        }
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal server error" });
    }
}
