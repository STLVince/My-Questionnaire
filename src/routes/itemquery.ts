import express from 'express';
import mysqlConnect from '../config/mysql'
import { stringify } from 'querystring';
const router = express.Router();

let res_data: string[][] = []
const mysqlConnection = mysqlConnect;

mysqlConnection.query('select id,title,createtime,endtime from collection', function (err, rows, fields) {
  if(err) console.log(err);
  for (let i in rows) {
    let item = [];
    for (let j in rows[i]) item.push(rows[i][j].toString());
    res_data.push(item);
    //console.log(item);
  }
});
router.get('/', (req, res, next) => {
  res.render('itemquery.ejs', {
    data: res_data
      .map(x => x.map(str => `"${str}"`).join(', '))
      .map(str => `[${str}]`).join(',')
  });
});

export default router;