import express from 'express';
import vipModel from '../model/vip';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('vip.ejs', { message: req.flash('vipMessage') });
});

router.get('/charge', (req, res) => {
  
  const name = req.user.local.email as string;
  console.log(`charge $(name)`);
  const newVip = new vipModel();
  newVip.set('local.username', name);
  newVip.save((err) => {
    if (err) {
      throw err;
    }
  });
  res.redirect('/');
});

export default router;