import express from 'express';

const svgCaptcha = require('svg-captcha');
const router = express.Router();

router.get('/',(req,res)=>{
	const captcha = svgCaptcha.create();
	req.session!.captcha = captcha.text; 
	console.log(req.session!.captcha); 
	res.cookie('captcha', req.session!.captcha); 
	res.setHeader('Content-Type', 'image/svg+xml');
	res.write(String(captcha.data));
	res.end();
});

export default router;