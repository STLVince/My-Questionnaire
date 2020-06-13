import express from 'express';

const router = express.Router();

let res_data : string[][] = []

router.get('/', (req, res, next) => {
  res.render('itemquery.ejs', { data:  res_data
    .map(x => x.map(str => `"${str}"`).join(', '))
    .map(str => `[${str}]`).join(',')  });
});

export default router;