import express, { Request, Response, NextFunction } from 'express';
import loginRouter from './login';
import signupRouter from './signup';
import candlestickchartRouter from './candlestickchart';
import itemqueryRouter from './itemquery';
import apiRouter from './api';
import downloadRouter from './download';
import additemRouter from './additem'
import fillitemRouter from './fillitem'
import captcha from './captcha';
import profile from './profile';
import vip from './vip';
import { isVip } from '../model/vip';

export const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/downloads', (req, res) => {
  res.render('downloads');
});

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
}

export async function isUserVip(req: Request, res: Response, next: NextFunction) {
  const name = req.user.local.email as string;
  console.log(`check vip for ${JSON.stringify(req.user)}`);
  if (await isVip(name)) {
    console.log(`${name} passed`);
    next();
    return;
  }
  req.flash('vipMessage', '请充值');
  console.log(`${name} failed`);
  res.redirect('/vip');
}

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/itemquery', isLoggedIn, itemqueryRouter);
router.use('/candlestickchart', isLoggedIn, isUserVip, candlestickchartRouter);
router.use('/api', isLoggedIn, apiRouter);
router.use('/download', downloadRouter);
router.use('/additem', additemRouter);
router.use('/fillitem', fillitemRouter);
router.use('/captcha', captcha);
router.use('/profile', isLoggedIn, profile);
router.use('/vip', isLoggedIn, vip);

export default router;