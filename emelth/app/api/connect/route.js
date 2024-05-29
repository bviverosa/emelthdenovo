import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import util from "util";
import bcrypt from "bcrypt"

const queryAsync = util.promisify(conn.query).bind(conn);

export async function GET() {
    try {
        const result = await queryAsync('SELECT NOW()');
        console.log(result);
        return NextResponse.json({ message: "Hello world", timestamp: result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error fetching timestamp" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const requestjson = await request.json();
        const checkEmailSql = 'SELECT * FROM usuario WHERE usu_correo = ?';
        const result = await queryAsync(checkEmailSql, [requestjson.username]);

        if (result.length > 0) {
            const match = await bcrypt.compare(requestjson.password.toString(), result[0].usu_pass);
            if (match) {
                const user = {
                    image: `${result[0].id_usu}`,
                    name: `${result[0].id_rol}`,
                    email: `${result[0].id_wsid}`
                };
                console.log(user);
                return NextResponse.json(user);
            } else {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
