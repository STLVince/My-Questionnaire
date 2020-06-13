import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('candlestickchart.ejs', {code: req.query.code, title: req.query.title});

});

export default router;