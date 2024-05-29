import mysql from 'mysql2';
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Heatens123-',
    database: 'emelth',
});
export default db;