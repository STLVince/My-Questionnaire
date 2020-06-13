import express from 'express';

const router = express.Router();

router.get('/home', (req, res) => {
  res.json({
    success: true
  });
});

router.get('/itemquery', (req, res) => {
  if (!req.query.stocknumber) {
    res.json({
      success: true
    });
  }
});
export default router;