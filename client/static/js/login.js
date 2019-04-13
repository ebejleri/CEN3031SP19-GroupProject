var hashCode = function(s){
	return ""+(s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));              
}

const popup = () => {
	$('#loginTrigger').trigger('click');
}

const try_login = (else_fn) => {
	try {
		const account = JSON.parse(window.sessionStorage.getItem('account'));
		if (!account.first_name)
			throw account;
		if (account.is_admin)
			window.location.href = "/user/admin.html"
		else
			window.location.href = "/user/index.html"
	}
	catch(e) {
		else_fn(e)
	}
}

$(document).on('click', '#login-click', (e) => {
	e.preventDefault();
	try_login(popup);
})

$('#loginContinue').click((e) => {
	e.preventDefault();
	const email = $('#email-input').val();
	const hash = hashCode($('#password-input').val());
	console.log("#1");
	$.get('/account/getaccount', {email: email, hash: hash}, function(data, msg) {
		if (!data || data.err || !data[0]) {
			alert("Incorrect Login!");
		}
		else {
			window.sessionStorage.setItem('account', JSON.stringify(data[0]));
			try_login(() => alert("Incorrect Login!"));
		}
	});
})