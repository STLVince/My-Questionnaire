import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('fillitem.ejs', { message: req.flash('fillitemMessage' )});

});

export default router;