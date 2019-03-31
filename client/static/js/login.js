const popup = () => {
	$('#loginTrigger').trigger('click');
}

const try_login = (email, pw, cbs) => {
	$.get('../account/getaccount', {
			email: email,
			hash: crypto.subtle.digest("SHA-512", pw),
	});
}

$(document).on('click', '#login-click', (e) => {
	if (window.sessionStorage.getItem('account'))
		return;
	e.preventDefault();
	popup();
})

$('#loginContinue').click((e) => {
	e.preventDefault();
	const email = $('#email-input').val();
	const hash = crypto.subtle.digest('SHA-512', $('#password-input').val());
	$.get('/account/getaccount', {email: email, hash: hash}, (res, status) => {})
	.done((e) => console.log("SUCCESS " + e));
	.fail((e) => console.log("FAIL " + e));
})