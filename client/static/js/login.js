var email = (v) => {
	if (v) {
		window.sessionStorage.setItem('email', v);
	}
	return window.sessionStorage.getItem('email');
}
var password = (v) => {
	if (v) {
		window.sessionStorage.setItem('password', v);
	}
	return window.sessionStorage.getItem('password');
}
$(document).on('click', '#login-click', (e) => {
	e.preventDefault();
	if (!email() || !password()) {
		popup();
		return;
	}
	try_login({
		err_cb: popup,
		then_cb: (acount_id, ) => {
			window.location.href = "/user/index.html";
		}
	});
	var hash = crypto.subtle.digest("SHA-512", password());
})