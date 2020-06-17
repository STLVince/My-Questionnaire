import mysql from "mysql";

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_questionaire'
});

let query = function (sql: string, values: any) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  })
}

export default query;