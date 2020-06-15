import mysql from "mysql";

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_questionaire'
});

export default pool;