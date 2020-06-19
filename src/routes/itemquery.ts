import express from 'express';
import mysqlQuery from '../config/mysql';
import moment= require('moment');
const router = express.Router();


router.get('/', async function (req, res, next) {
  let res_data: string[][] = [];
  let rows: any = await mysqlQuery('select id,title,createtime,endtime from collection where username=?', req.user.local.email);
  for (let i in rows) {
    let item = [];
    item.push(rows[i].id.toString());
    item.push(rows[i].title.toString());
    var sdate = new Date(rows[i].createtime.toString());
    var sdate_res = moment(sdate).format("YYYY-MM-DD HH:mm:ss");
    item.push(sdate_res);
    var edate = new Date(rows[i].endtime.toString());
    var edate_res = moment(edate).format("YYYY-MM-DD HH:mm:ss");
    item.push(edate_res);
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    if(now < edate_res)
      item.push(false);
    else
      item.push(true);
    res_data.push(item);
    //console.log(item);
  }
  res.render('itemquery.ejs', {
    data: res_data
      .map(x => x.map(str => `"${str}"`).join(', '))
      .map(str => `[${str}]`).join(',')
  });
});

export default router;