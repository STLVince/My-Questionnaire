import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('additem.ejs', { message: req.flash('additemMessage' )});
});

router.post('/add', (req, res) => {
    console.log(req.body);
    res.redirect('/itemquery');
});



export default router;