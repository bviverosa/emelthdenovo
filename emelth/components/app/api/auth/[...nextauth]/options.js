import CredentialsProvider from "next-auth/providers/credentials";
import { conn } from "@/lib/mysql";
import bcrypt from "bcrypt";
import util from "util";


const queryAsync = util.promisify(conn.query).bind(conn);
export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const{username,password}=credentials;
        console.log(credentials)
        if (username) {
          const checkEmailSql = 'SELECT * FROM usuario WHERE usu_correo = ?';
          try {
            
            const result = await queryAsync(checkEmailSql, [username]);
            console.log(result)
        if (result.length > 0) {
            const match = await bcrypt.compare(password.toString(), result[0].usu_pass);
            if (match) {
              const user= {
                image: `${result[0].id_usu}`,
                name: `${result[0].id_rol}`,
                email: `${result[0].id_wsid}`
            }
            console.log(user)
                return user
            } else {
                return null
            }
        } else {
            return null
        }
          } catch (err) {
            console.error(err);
            return null;
          }
        }
      },
    }),
  ],

  pages: {
    signIn: "/signIn",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    async session(session, user) {
      session.rol = user.rol;
      session.webSocketId = user.webSocketId;
      return session;
    },
  },

  
};