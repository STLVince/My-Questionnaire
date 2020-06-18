import express from 'express';
import mysqlQuery from '../config/mysql'
import e from 'express';
const ip = require('ip');
const router = express.Router();

let types: string[];
let currentTitle: string;

router.get('/', async function (req, res) {
    let res_data: string[][] = [];
    types = [];
    currentTitle = req.query.title;
    let rows: any = await mysqlQuery('select qid,display,qabstract,qtype,op1,op2,op3,op4 from form_question join collection on form_question.title=collection.title where collection.id=?', [req.query.code]);
    for (let i in rows) {
        let item = [];
        for (let j in rows[i]) item.push(rows[i][j].toString());
        res_data.push(item);
        types.push(rows[i].qtype.toString());
    }
    res.render('fillitem.ejs', {
        data: res_data
            .map(x => x.map(str => `"${str}"`).join(', '))
            .map(str => `[${str}]`).join(','),
        title: currentTitle
    });
});

function opParse(type: string, ops: any) {
    if (type == "1" || type == "2" || type == "3") {
        let tmp: string = ops.toString();
        if (tmp == "1")
            return 1;
        else if (tmp == "2")
            return 2;
        else if (tmp == "3")
            return 4;
        else if (tmp == "4")
            return 8;
    }
    else if (type == "4" || type == "5" || type == "6") {
        let res:number = 0;
        for (let i in ops) {
            let tmp: number = 0;
            if (ops[i] == "1")
                tmp = 1;
            else if (ops[i] == "2")
                tmp = 2;
            else if (ops[i] == "3")
                tmp = 4;
            else if (ops[i] == "4")
                tmp =  8;
            res |= tmp;
        }
        return res;
    }
    return 0;
}

router.post('/sub', async function (req, res) {
    let author: string = "";
    let qs = JSON.parse(JSON.stringify(req.body));
    if (req.user == null)
        author = ip.address();
    else
        author = req.user.local.email;
    let index = 0;
    for (let i in qs) {
        let op: any = null;
        let text: any = null;
        let num: any = null;
        let score: any = null;
        switch (types[index]) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
                op = opParse(types[index], qs[i]);
                break;
            case "7":
                text = qs[i].toString();
                break;
            case "8":
                num = qs[i].toString();
                break;
            case "9":
                score = qs[i].toString();
                break;
            default:
                break;
        }
        let ret = await mysqlQuery('insert into form_answer (qid, username, title, type, op, text, num, score) values(?, ?, ?, ?, ?, ?, ?, ?)', [index + 1, author, currentTitle, types[index], op, text, num, score]);
        index++;
    }
    //console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect('/itemquery');
});

export default router;