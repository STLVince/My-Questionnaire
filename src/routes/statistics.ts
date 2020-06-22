import express from 'express';
import mysqlQuery from '../config/mysql';

const router = express.Router();

router.get('/', async function (req, res) {
	let res_q: string[][] = [];
	let res_an: string[][] = [];
	let rows1: any = await mysqlQuery('select qid,qabstract,qtype,op1,op2,op3,op4 from form_question join collection on form_question.title=collection.title where collection.id=?', [req.query.code]);
	let qnum = 0;
	for (let i in rows1) {
		let item = [];
		for (let j in rows1[i]) item.push(rows1[i][j].toString());
		res_q.push(item);
		qnum++;
	}
	for (let i = 1; i <= qnum; i++) {
		let item = [];
		let rows2: any = await mysqlQuery('select type, op, text, num, score from form_answer join collection on form_answer.title=collection.title where collection.id=? and qid=?', [req.query.code, i]);
		let op1 = 0;
		let op2 = 0;
		let op3 = 0;
		let op4 = 0;
		let op5 = 0;
		let op6 = 0;
		let op7 = 0;
		let total = 0;
		let avg = 0;
		if (rows2 == "")
			break;
		switch (rows2[0].type.toString()) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
				for (let j in rows2) {
					var tmp1: number = Number(rows2[j].op.toString());
					if (tmp1 & 0x1) op1++;
					if (tmp1 & 0x2) op2++;
					if (tmp1 & 0x4) op3++;
					if (tmp1 & 0x8) op4++;
				}
				item.push(op1.toString());
				item.push(op2.toString());
				item.push(op3.toString());
				item.push(op4.toString());
				break;
			case "7":
				for (let j in rows2) {
					item.push(rows2[j].text.toString());
				}
				break;
			case "8":
				var tmp2: number = 0;
				for (let j in rows2) {
					var tmp4 = Number(rows2[j].num.toString());
					if(tmp4 != 0) {
						total += tmp4;
						tmp2++;
					}
				}
				avg = total / tmp2;
				item.push(total.toString());
				item.push(avg.toString());
				break;
			case "9":
				for (let j in rows2) {
					var tmp3: number = Number(rows2[j].score.toString());
					if (tmp3 == 1) op1++;
					if (tmp3 == 2) op2++;
					if (tmp3 == 3) op3++;
					if (tmp3 == 4) op4++;
					if (tmp3 == 5) op5++;
					if (tmp3 == 6) op6++;
					if (tmp3 == 7) op7++;
				}
				item.push(op1.toString());
				item.push(op2.toString());
				item.push(op3.toString());
				item.push(op4.toString());
				item.push(op5.toString());
				item.push(op6.toString());
				item.push(op7.toString());
				break;
			default:
				break;
		}
		res_an.push(item);
	}

	res.render('statistics.ejs', {
		question: res_q
		.map(x => x.map(str => `"${str}"`).join(', '))
		.map(str => `[${str}]`).join(','),
		answer: res_an
		.map(x => x.map(str => `"${str}"`).join(', '))
		.map(str => `[${str}]`).join(',')
	});
});

export default router;