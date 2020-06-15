import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('fillitem.ejs', { message: req.flash('fillitemMessage' )});
});

router.post('/sub', (req, res) => {
    console.log(req.body);
    res.redirect('/itemquery');
});

export default router;