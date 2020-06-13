import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('additem.ejs', { message: req.flash('additemMessage' )});

});

export default router;