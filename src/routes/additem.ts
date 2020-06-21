import express from 'express';
import mysqlQuery from '../config/mysql';
import moment= require('moment');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('additem.ejs', { message: req.flash('additemMessage') });
});

router.post('/add', async function(req, res) {
    let form = JSON.parse(JSON.stringify(req.body));
    let end = moment().add(form.endtime, "days").format("YYYY-MM-DD HH:mm:ss");
    var tmp:string[] = form.qabstract;
    let ret = await mysqlQuery('insert into collection (title, username, abstract, endtime, accesstype, accessnum) values(?, ?, ?, ?, ?, ?)', [form.formname, req.user.local.email, form.formabstract, end, form.formaccesstype, form.formaccessnum]);
    for(let i = 0; i < tmp.length; i++) {
        let ret = await mysqlQuery('insert into form_question (title, qid, qabstract, qtype, op1, op2, op3, op4, qcas, qcasnum, qcasop) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [form.formname, i + 1, form.qabstract[i], form.qtype[i], form.op1[i], form.op2[i], form.op3[i], form.op4[i], Number(form.qcas[i]) - 1, form.qcasnum[i], form.qcasop[i]] );
    }
    res.redirect('/itemquery');
});



export default router;