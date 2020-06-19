function login() {
	var email = $("input[name='email']").val();
	var pwd = $("input[name='password']").val();
	var userCaptcha = $("input[name='captcha']").val();
	let captcha = getcookie("captcha");

	if(userCaptcha!=captcha) {
		console.log(userCaptcha);
		console.log(captcha);
		alertMessage("验证码错误");
		return;
	}
	else if(!pwdVerified())
		return;
	else {
		$("#form").submit(); 
	}
}

function signup() {
	var email = $("input[name='email']").val();
	var pwd = $("input[name='password']").val();
	var userCaptcha = $("input[name='captcha']").val();
	let captcha = getcookie("captcha");

	if(userCaptcha!=captcha) {
		console.log(userCaptcha);
		console.log(captcha);
		alertMessage("验证码错误");
		return;
	}
	else if(!pwdVerified())
		return;
	else {
		$("#form").submit(); 
	}
}


function getcookie(objname) {
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0] == objname) return unescape(temp[1]);
    }
}

function pay(show) {
	var payDiv = $('.pay');
    var payBackgroundDiv = $('.pay-background');
    if (show) {
        payDiv.css('display', 'block');
		payBackgroundDiv.css('display', 'block');
    } else {
        payDiv.css('display', 'none');
        payBackgroundDiv.css('display', 'none');
    }
}

function pwdVerified() {
	if($("input[name='password']").val().length < 8) {
		alertMessage("密码小于8位，请修改");
		console.log('short');
		return false;
	}
	return true;
}

function alertMessage(message) {
	var messageDiv = document.getElementById('notification');
	messageDiv.setAttribute('style', 'display: block');
	messageDiv.textContent = message;
}

