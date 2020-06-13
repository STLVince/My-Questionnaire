import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('downloads.ejs', { message: req.flash('downloadMessage' )});

});

export default router;