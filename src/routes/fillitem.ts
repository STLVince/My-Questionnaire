import express from 'express';
import mysqlQuery from '../config/mysql'
const router = express.Router();


router.get('/', async function (req, res) {
    let res_data: string[][] = [];
    let rows: any = await mysqlQuery('select qid,display,qabstract,qtype,op1,op2,op3,op4 from form_question join collection on form_question.title=collection.title where collection.id=?', [req.query.code]);
    for (let i in rows) {
        let item = [];
        for (let j in rows[i]) item.push(rows[i][j].toString());
        res_data.push(item);
    }
    res.render('fillitem.ejs', {
        data: res_data
            .map(x => x.map(str => `"${str}"`).join(', '))
            .map(str => `[${str}]`).join(',')
    });
});


router.post('/sub', (req, res) => {
    console.log(req.body);
    res.redirect('/itemquery');
});

export default router;