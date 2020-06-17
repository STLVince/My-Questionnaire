import express from 'express';
import mysqlConnect from '../config/mysql';
import { stringify } from 'querystring';

const router = express.Router();

const mysqlConnection = mysqlConnect;
//mysqlConnection.connect();

let res_data : string[][] = []

/*mysqlConnection.query('select  * from stock', function(err, rows, fields) {
  // if (err) throw err;
  for (let i in rows) {
    let item = [];
     for (let j in rows[i]) item.push(rows[i][j].toString());
     res_data.push(item);
    //  console.log(item);
 }
});*/

//mysqlConnection.end();

router.get('/', (req, res, next) => {
  res.render('stockquery.ejs', { data:  res_data
    .map(x => x.map(str => `"${str}"`).join(', '))
    .map(str => `[${str}]`).join(',')  });
});

export default router;