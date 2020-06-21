import express from 'express';
import mysqlQuery from '../config/mysql';
import moment= require('moment');

const router = express.Router();

router.get('/', async function(req, res) {
    let res_data: string[][] = [];
    let row0: any = await mysqlQuery('select abstract,accesstype,accessnum from collection where title=?', req.query.title);
    for (let i in row0) {
        let item = [];
        item.push(row0[i].abstract.toString());
        item.push(row0[i].accesstype.toString());
        item.push(row0[i].accessnum.toString());
        res_data.push(item);
    }
    let rows: any = await mysqlQuery('select qid,qabstract,qtype,op1,op2,op3,op4 from form_question join collection on form_question.title=collection.title where collection.id=?', [req.query.code]);
    let rownum: number = 0;
    for (let i in rows) {
        let item = [];
        for (let j in rows[i]) item.push(rows[i][j].toString());
        res_data.push(item);
        rownum++;
    }
    res.render('edititem.ejs', { 
        data: res_data
        .map(x => x.map(str => `"${str}"`).join(', '))
        .map(str => `[${str}]`).join(','),
        title: req.query.title,
        qnum: rownum
    });
});

router.post('/update', async function(req, res) {
    let form = JSON.parse(JSON.stringify(req.body));
    let end = moment().add(form.endtime, "days").format("YYYY-MM-DD HH:mm:ss");
    var tmp:string[] = form.qabstract;
    let ret = await mysqlQuery('update collection set abstract=?, endtime=?, accesstype=?, accessnum=? where title=?', [form.formabstract, end, form.formaccesstype, form.formaccessnum, form.formname]);
    for(let i = 0; i < tmp.length; i++) {
        let ret = await mysqlQuery('update form_question set qabstract=?, qtype=?, op1=?, op2=?, op3=?, op4=?, qcas=?, qcasnum=?, qcasop=? where qid=? and title=?', [form.qabstract[i], form.qtype[i], form.op1[i], form.op2[i], form.op3[i], form.op4[i], Number(form.qcas[i]) - 1, form.qcasnum[i], form.qcasop[i], i + 1, form.formname]);
    }
    res.redirect('/itemquery');
});

export default router;