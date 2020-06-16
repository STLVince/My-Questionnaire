import express from 'express';
import mysqlConnect from '../config/mysql'
import moment= require('moment');

const router = express.Router();
const mysqlConnection = mysqlConnect;

router.get('/', (req, res) => {
    res.render('additem.ejs', { message: req.flash('additemMessage') });
});

router.post('/add', (req, res) => {
    let form = JSON.parse(JSON.stringify(req.body));
    let end = moment().add(form.endtime, "days").format("YYYY-MM-DD HH:mm:ss");
    var tmp:string[] = form.qabstract;
    mysqlConnection.query('insert into collection (title, abstract, endtime, accesstype, accessnum) values(?, ?, ?, ?, ?)', [form.formname, form.formabstract, end, form.formaccesstype, form.formaccessnum], function (err, rows, fields) {
        if (err) console.log(err);
    });
    for(let i = 0; i < tmp.length; i++) {
        mysqlConnection.query('insert into form_question values(title, qid, qabstract, qtype, op1, op2, op3, op4) values(?, ?, ?, ?, ?, ?, ?, ?)', [form.formname, i + 1, form.qabstract[i], form.qtype[i], form.op1[i], form.op2[i], form.op3[i], form.op4[i],], function (err, rows, fields) {
            if (err) console.log(err);
        });
    }
    res.redirect('/itemquery');
});



export default router;