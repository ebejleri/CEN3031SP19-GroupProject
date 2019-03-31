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