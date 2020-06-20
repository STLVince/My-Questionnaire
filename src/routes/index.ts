import express, { Request, Response, NextFunction } from 'express';
import loginRouter from './login';
import signupRouter from './signup';
import itemqueryRouter from './itemquery';
import collectionRouter from './collection'
import apiRouter from './api';
import additemRouter from './additem'
import fillitemRouter from './fillitem'
import edititemRouter from './edititem'
import statisticsRouter from './statistics'
import captcha from './captcha';
import profile from './profile';
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
}

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/itemquery', isLoggedIn, itemqueryRouter);
router.use('/collection', collectionRouter);
router.use('/api', isLoggedIn, apiRouter);
router.use('/additem', isLoggedIn, additemRouter);
router.use('/fillitem', fillitemRouter);
router.use('/edititem', isLoggedIn, edititemRouter);
router.use('/statistics', isLoggedIn, statisticsRouter);
router.use('/captcha', captcha);
router.use('/profile', isLoggedIn, profile);

export default router;